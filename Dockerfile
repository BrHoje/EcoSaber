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
COPY ecosaber_backup.dump ./

# Tornar o script de inicialização executável
COPY init-db.sh ./
RUN chmod +x ./init-db.sh

# Instalar dependências
RUN npm install

# Copiar código-fonte
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY public ./public

# Construir o projeto
RUN npm run build

# Expor a porta
EXPOSE 5000

# Verificação de saúde
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Comando para iniciar o servidor
CMD ["npm", "start"]