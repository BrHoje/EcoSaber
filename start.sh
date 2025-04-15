#!/bin/sh
set -e

# Não precisamos mais buscar o arquivo de backup,
# vamos confiar na inicialização automática do esquema pelo código

echo "Testando conexão com banco de dados..."
PGPASSWORD=${PGPASSWORD} psql -h ${PGHOST} -U ${PGUSER} -d ${PGDATABASE} -c '\conninfo' || echo "Aviso: Não foi possível conectar ao banco de dados. A aplicação tentará criar esquema básico se necessário."

# Iniciar a aplicação
echo "Iniciando a aplicação..."
exec npm start