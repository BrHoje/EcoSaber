# Implantação no EasyPanel

## Requisitos

- Um servidor com EasyPanel instalado
- Acesso ao GitHub para clonar o repositório
- Arquivo de backup do banco de dados: `ecosaber_backup.dump`

## Passos para implantação

1. No EasyPanel, crie um novo projeto chamado "ecosaber"

2. Selecione "GitHub" como fonte e conecte-se ao seu repositório

3. Escolha a opção "Dockerfile" para implantação 

4. Faça upload do arquivo `ecosaber_backup.dump` para o servidor
   ```bash
   scp ecosaber_backup.dump user@seu-servidor:/etc/easypanel/projects/ia/ecosaber/
   ```

5. Configure as variáveis de ambiente:
   - `NODE_ENV`: production
   - `DATABASE_URL`: será preenchido automaticamente pelo EasyPanel

6. Implante o projeto

O EasyPanel usará o Dockerfile para construir a imagem e iniciar o contêiner. O banco de dados PostgreSQL será configurado automaticamente e inicializado com os dados do backup.

## Verificando a implantação

1. Acesse o painel do EasyPanel e verifique os logs do projeto

2. Se houver algum problema, verifique:
   - Se o arquivo de backup está no local correto
   - Se o PostgreSQL está rodando corretamente
   - Se as variáveis de ambiente estão configuradas corretamente

3. Acesse o site através da URL fornecida pelo EasyPanel