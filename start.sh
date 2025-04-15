#!/bin/bash
set -eo pipefail

# Tratamento de sinais para desligamento limpo
trap 'echo "Recebido sinal para parar. Desligando aplicação de forma limpa..."; exit 0' SIGTERM SIGINT

# Configuração de logs
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Função para tentar conexão repetidamente
try_connect() {
  local retries=5
  local wait=5
  local attempt=1
  
  while [ $attempt -le $retries ]; do
    log "Tentativa $attempt de $retries para conectar ao banco de dados..."
    if PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -c '\conninfo' 2>/dev/null; then
      log "✓ Conexão estabelecida com sucesso!"
      return 0
    fi
    log "× Falha na tentativa $attempt. Aguardando $wait segundos..."
    sleep $wait
    attempt=$((attempt + 1))
  done
  
  log "⚠️ Não foi possível conectar ao banco após $retries tentativas."
  return 1
}

# Conexão específica do EasyPanel
export PGPASSWORD="47b47cd6c33582dafa23"
export PGUSER="postgres"
export PGHOST="c5qiwz.easypanel.host"
export PGDATABASE="ecosaber"
export DB_URL="postgres://postgres:47b47cd6c33582dafa23@c5qiwz.easypanel.host:5432/ecosaber?sslmode=disable"

# Garantir que a aplicação use a URL correta do banco de dados
export DATABASE_URL="$DB_URL"

log "Iniciando EcoSaber..."
log "Ambiente: $NODE_ENV"
log "Testando conexão com banco de dados..."

if ! try_connect; then
  log "⚠️ Aplicação continuará sem banco de dados inicial."
else
  # Verificar se existem tabelas no banco de dados
  log "Verificando estrutura do banco de dados..."
  TABLE_COUNT=$(PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'" 2>/dev/null | tr -d '[:space:]' || echo "0")

  log "Contagem de tabelas no banco: $TABLE_COUNT"
  
  if [ "$TABLE_COUNT" = "0" ]; then
    log "Banco de dados vazio. Criando esquema básico..."
    
    # Criar tabelas básicas diretamente via SQL
    if PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} << EOF
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS participants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        institution TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        value TEXT NOT NULL,
        icon TEXT,
        category TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Inserir dados básicos
      INSERT INTO resources (title, description, type, url) VALUES 
      ('Guia de Educação Sustentável', 'Material introdutório para educadores', 'document', 'https://example.com/guide.pdf'),
      ('Vídeo: Introdução aos ODS', 'Vídeo explicativo sobre os ODS da ONU', 'video', 'https://example.com/video');
      
      INSERT INTO testimonials (name, role, content) VALUES 
      ('Maria Silva', 'Professora', 'Este projeto transformou minha forma de ensinar sustentabilidade.'),
      ('João Santos', 'Diretor Escolar', 'Conseguimos engajar toda a escola com os materiais do EcoSaber.');
      
      INSERT INTO stats (label, value, icon, category) VALUES 
      ('dos participantes relatam maior engajamento', '87%', 'trending-up', 'impact'),
      ('escolas participantes', '42', 'school', 'impact'),
      ('recursos educacionais disponíveis', '75+', 'file-text', 'about'),
      ('educadores treinados', '320', 'users', 'about'),
      ('Estudantes Alcançados', '12.500', 'users', 'impact'),
      ('Projetos Implementados', '68', 'folder', 'impact');
EOF
    then
      log "✓ Esquema básico criado com sucesso!"
    else
      log "⚠️ Falha ao criar esquema básico, mas a aplicação continuará."
    fi
  else
    log "✓ O banco de dados já contém $TABLE_COUNT tabelas. Esquema existente será mantido."
  fi
fi

# Configuração do servidor Node.js para melhor estabilidade
log "Otimizando configurações do Node.js..."
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=512 --max-semi-space-size=64}"

# Iniciar a aplicação com monitoramento de processos
log "Iniciando a aplicação..."
if [ "$NODE_ENV" = "production" ]; then
  log "Modo: Produção"
  
  # Verificar disponibilidade da porta
  if nc -z 0.0.0.0 5000 >/dev/null 2>&1; then
    log "⚠️ Porta 5000 já está em uso. Aguardando liberação..."
    for i in $(seq 1 30); do
      sleep 2
      if ! nc -z 0.0.0.0 5000 >/dev/null 2>&1; then
        log "✓ Porta 5000 liberada após $((i*2)) segundos."
        break
      fi
      if [ $i -eq 30 ]; then
        log "⚠️ Timeout aguardando porta. Tentando iniciar mesmo assim."
      fi
    done
  fi

  exec npm start
else
  log "Modo: Desenvolvimento"
  exec npm run dev
fi