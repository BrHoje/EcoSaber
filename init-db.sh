#!/bin/sh
set -e

echo "Tentando conectar ao PostgreSQL em $PGHOST..."
# Permitir mais tempo de espera - importante para o EasyPanel
for i in $(seq 1 30); do
  if PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c '\q' 2>/dev/null; then
    echo "Conexão com PostgreSQL estabelecida após $i tentativas"
    break
  fi
  
  if [ $i -eq 30 ]; then
    echo "Não foi possível conectar ao PostgreSQL após 30 tentativas. Abortando."
    exit 1
  fi
  
  echo "Tentativa $i: PostgreSQL não está disponível. Tentando novamente em 5 segundos..."
  sleep 5
done

# Verificar se existe qualquer tabela no esquema público
TABLE_COUNT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'" | tr -d '[:space:]')

echo "Número de tabelas existentes: $TABLE_COUNT"

if [ "$TABLE_COUNT" = "0" ]; then
  echo "Banco de dados vazio. Iniciando importação..."
  
  # Usar opções mais robustas para o pg_restore
  pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --no-owner --no-privileges --clean /app/ecosaber_backup.dump
  
  if [ $? -eq 0 ]; then
    echo "Importação concluída com sucesso!"
  else
    echo "Houve um problema na importação. Tentando método alternativo..."
    
    # Tentar criar esquema manualmente a partir do backup SQL
    PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c "CREATE SCHEMA IF NOT EXISTS public;"
    
    # Forçar pg_restore ignorando erros
    pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --no-owner --no-privileges --clean --if-exists /app/ecosaber_backup.dump || true
    
    echo "Tentativa alternativa concluída."
  fi
else
  echo "Banco de dados já contém tabelas. Verificando tabela 'resources'..."
  
  # Verificar se a tabela específica existe
  TABLE_EXISTS=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'resources' AND table_schema = 'public')" | tr -d '[:space:]')
  
  if [ "$TABLE_EXISTS" = "t" ]; then
    # Verificar se existem registros
    COUNT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT COUNT(*) FROM resources" | tr -d '[:space:]')
    
    if [ "$COUNT" = "0" ]; then
      echo "Tabela resources existe mas está vazia. Inserindo dados..."
      pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --data-only --no-owner --no-privileges --clean --if-exists /app/ecosaber_backup.dump || true
      echo "Inserção de dados concluída."
    else
      echo "Banco de dados já contém dados. Pulando importação."
    fi
  else
    echo "Tabela resources não existe. Tentando criar esquema completo..."
    pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE --no-owner --no-privileges --clean --if-exists /app/ecosaber_backup.dump || true
    echo "Restauração concluída."
  fi
fi

echo "Processo de inicialização do banco de dados finalizado."