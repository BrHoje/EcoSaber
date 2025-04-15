#!/bin/bash
set -e

echo "Aguardando PostgreSQL iniciar..."
sleep 5

# Verificar se os dados já foram importados
RESULT=$(psql -U postgres -d ecosaber -c "SELECT count(*) FROM resources" -t || echo "0")

if [ "$RESULT" -eq "0" ]; then
  echo "Iniciando importação do banco de dados..."
  pg_restore -U postgres -d ecosaber -v /app/ecosaber_backup.dump
  echo "Importação concluída!"
else
  echo "Banco de dados já contém dados. Pulando importação."
fi