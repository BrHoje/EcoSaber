#!/bin/bash
set -e

# Configurações do banco de dados
DB_URL="postgres://postgres:47b47cd6c33582dafa23@c5qiwz.easypanel.host:5432/ecosaber?sslmode=disable"
PGPASSWORD="47b47cd6c33582dafa23"
PGUSER="postgres" 
PGHOST="c5qiwz.easypanel.host"
PGDATABASE="ecosaber"
BACKUP_FILE="ecosaber_backup.dump"

# Verificar se o arquivo de backup existe
if [ ! -f "$BACKUP_FILE" ]; then
  echo "Erro: Arquivo de backup $BACKUP_FILE não encontrado!"
  exit 1
fi

echo "Verificando conexão com o banco de dados..."
if ! PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c '\conninfo'; then
  echo "Erro: Não foi possível conectar ao banco de dados!"
  exit 1
fi

echo "Verificando se o banco já contém dados..."
TABLE_COUNT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'" | tr -d '[:space:]')

if [ "$TABLE_COUNT" = "0" ]; then
  echo "Banco de dados vazio. Iniciando importação completa..."
  
  echo "Importando backup..."
  pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --no-owner --no-privileges -v "$BACKUP_FILE"
  
  echo "Verificando tabelas após importação..."
  TABLES=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
  echo "Tabelas importadas:"
  echo "$TABLES"
else
  echo "O banco de dados já contém $TABLE_COUNT tabelas."
  
  echo "Verificando tabela resources..."
  RESOURCES_EXISTS=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resources')" | tr -d '[:space:]')
  
  if [ "$RESOURCES_EXISTS" = "t" ]; then
    RESOURCES_COUNT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT COUNT(*) FROM resources" | tr -d '[:space:]')
    echo "Tabela resources existe com $RESOURCES_COUNT registros."
    
    if [ "$RESOURCES_COUNT" = "0" ]; then
      echo "Importando apenas dados (sem estrutura)..."
      pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --data-only --no-owner --no-privileges -v "$BACKUP_FILE"
    else
      echo "Tabela resources já possui dados. Nenhuma ação necessária."
    fi
  else
    echo "Tabela resources não existe. Tentando importar backup completo..."
    pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --no-owner --no-privileges -v "$BACKUP_FILE" || true
  fi
fi

echo "Processo de importação concluído."