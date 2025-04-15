#!/bin/sh
set -e

# Primeiro, executar o script de inicialização do banco de dados
if [ -f /app/ecosaber_backup.dump ]; then
  echo "Arquivo de backup encontrado, tentando inicializar o banco de dados..."
  /app/init-db.sh || true
else
  echo "Arquivo de backup não encontrado. Pulando inicialização do banco de dados."
fi

# Iniciar a aplicação
echo "Iniciando a aplicação..."
exec npm start