#!/bin/sh
set -e

# Verificar se o arquivo de backup existe e tem tamanho > 0
if [ -s /app/ecosaber_backup.dump ]; then
  echo "Arquivo de backup encontrado, tentando inicializar o banco de dados..."
  /app/init-db.sh || echo "Inicialização do banco completada com avisos"
else
  echo "Arquivo de backup não encontrado ou vazio. Usando inicialização básica."
  # Ainda assim, tentar estabelecer conexão com o banco para criar tabelas básicas
  # (a aplicação tentará criar o esquema básico se necessário)
  echo "Testando conexão com banco de dados..."
  PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -c '\conninfo' || echo "Aviso: Não foi possível conectar ao banco de dados"
fi

# Iniciar a aplicação
echo "Iniciando a aplicação..."
exec npm start