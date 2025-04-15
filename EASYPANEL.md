# Implantação do EcoSaber no EasyPanel

## Requisitos

- Um servidor com EasyPanel instalado
- Acesso ao GitHub para clonar o repositório
- Arquivo de backup do banco de dados: `ecosaber_backup.dump`

## Passos Específicos para o Banco de Dados Existente

O projeto está configurado para usar o banco de dados previamente criado no EasyPanel com a seguinte URL:

```
postgres://postgres:47b47cd6c33582dafa23@ia_ecosaber-database:5432/ecosaber?sslmode=disable
```

Para garantir que o banco de dados seja inicializado corretamente com todos os dados:

1. Certifique-se de que o arquivo `ecosaber_backup.dump` está incluído no seu repositório Git
   * Note que este arquivo já foi adicionado ao repositório e o Docker vai automaticamente copiá-lo
   * Caso precise substituir por uma versão mais recente, atualize o arquivo no repositório

2. A inicialização do banco de dados acontecerá automaticamente durante o startup da aplicação
   * O script `start.sh` chamará `init-db.sh` que verificará se o banco existe
   * Se as tabelas não existirem, elas serão criadas
   * O backup será importado automaticamente

## Passos para Implantação

1. No EasyPanel, crie um novo projeto chamado "ecosaber"

2. Configure o projeto:
   - **Source**: GitHub (conecte ao seu repositório)
   - **Build Method**: Dockerfile (o Dockerfile já está configurado)
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `DATABASE_URL`: postgres://postgres:47b47cd6c33582dafa23@ia_ecosaber-database:5432/ecosaber?sslmode=disable
     - `PGPASSWORD`: 47b47cd6c33582dafa23
     - `PGUSER`: postgres
     - `PGHOST`: ia_ecosaber-database
     - `PGDATABASE`: ecosaber

3. Clique em "Deploy" e aguarde a conclusão da implantação

## Verificando a Implantação

1. Acesse o painel do EasyPanel e verifique os logs do projeto
   * Observe os logs de inicialização que mostrarão o processo de verificação/importação do banco
   * Se tudo correr bem, você verá mensagens de "Esquema do banco de dados verificado/criado com sucesso"

2. Acesse a aplicação pela URL fornecida pelo EasyPanel

## Solução de Problemas

Se enfrentar problemas com a inicialização do banco de dados:

1. Verifique se o container pode acessar o banco de dados:
   ```bash
   docker exec -it {container_id} sh
   psql -h ia_ecosaber-database -U postgres -d ecosaber
   ```

2. Verifique os logs do container:
   ```bash
   docker logs {container_id}
   ```

3. Tente importar manualmente o backup:
   ```bash
   docker exec -it {container_id} sh
   pg_restore -h ia_ecosaber-database -U postgres -d ecosaber --no-owner --clean /app/ecosaber_backup.dump
   ```