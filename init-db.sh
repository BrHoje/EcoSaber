#!/bin/sh
set -e

echo "Aguardando PostgreSQL iniciar..."
# Espera o PostgreSQL ficar disponível
until PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c '\q'; do
  echo "PostgreSQL ainda não está disponível - aguardando..."
  sleep 3
done

echo "PostgreSQL está disponível"

# Verificar se os dados já foram importados
RESULT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'resources')" | tr -d '[:space:]')

if [ "$RESULT" = "f" ]; then
  echo "Iniciando importação do banco de dados..."
  pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE -v /app/ecosaber_backup.dump
  echo "Importação concluída!"
else
  # Verificar se existem registros
  COUNT=$(PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -t -c "SELECT COUNT(*) FROM resources" | tr -d '[:space:]')
  
  if [ "$COUNT" = "0" ]; then
    echo "Tabela resources existe mas está vazia. Iniciando importação..."
    pg_restore -h $PGHOST -U $PGUSER -d $PGDATABASE -v /app/ecosaber_backup.dump
    echo "Importação concluída!"
  else
    echo "Banco de dados já contém dados. Pulando importação."
  fi
fi