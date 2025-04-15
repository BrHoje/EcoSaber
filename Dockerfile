FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk update && apk add --no-cache \
    postgresql-client \
    bash \
    curl \
    jq \
    ca-certificates \
    tzdata

# Definir timezone
ENV TZ=America/Sao_Paulo

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./

# Copiar scripts de inicialização
COPY init-db.sh ./
COPY start.sh ./
RUN chmod +x ./init-db.sh ./start.sh

# Instalar dependências
RUN npm install

# Copiar código-fonte
COPY client ./client
COPY server ./server
COPY shared ./shared

# Criar diretório public vazio (caso não exista no repositório)
RUN mkdir -p ./public

# Tentativa de copiar o backup (mas não falhar se não existir)
# Usa um truque com direcionamento para lidar com arquivos que podem não existir
RUN touch dummy_file.dump
COPY dummy_file.dump ecosaber_backup.dump* ./

# Construir o projeto
RUN npm run build

# Expor a porta
EXPOSE 5000

# Verificação de saúde
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Comando para iniciar o servidor
CMD ["./start.sh"]