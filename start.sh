#!/bin/sh
set -e

# Conexão específica do EasyPanel
export PGPASSWORD="47b47cd6c33582dafa23"
export PGUSER="postgres"
export PGHOST="c5qiwz.easypanel.host"
export PGDATABASE="ecosaber"
export DB_URL="postgres://postgres:47b47cd6c33582dafa23@c5qiwz.easypanel.host:5432/ecosaber?sslmode=disable"

echo "Testando conexão com banco de dados..."
PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -c '\conninfo' || {
  echo "⚠️ Aviso: Não foi possível conectar ao banco de dados."
  echo "A aplicação tentará criar esquema básico automaticamente."
}

# Verificar se existem tabelas no banco de dados
echo "Verificando o banco de dados..."
TABLE_COUNT=$(PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'" 2>/dev/null | tr -d '[:space:]' || echo "0")

if [ "$TABLE_COUNT" = "0" ]; then
  echo "Banco de dados vazio. Criando esquema básico..."
  
  # Criar tabelas básicas diretamente via SQL
  PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} << EOF
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
  
  echo "Esquema básico criado com sucesso!"
else
  echo "O banco de dados já contém $TABLE_COUNT tabelas. Pulando criação de esquema."
fi

# Garantir que a aplicação use a URL correta do banco de dados
echo "Configurando variáveis de ambiente da aplicação..."
export DATABASE_URL="$DB_URL"

# Iniciar a aplicação
echo "Iniciando a aplicação..."
if [ "$NODE_ENV" = "production" ]; then
  echo "Executando em modo de produção"
  exec npm start
else
  echo "Executando em modo de desenvolvimento"
  exec npm run dev
fi