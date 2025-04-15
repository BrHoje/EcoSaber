FROM node:18-alpine AS builder

# Definir pasta de trabalho
WORKDIR /build

# Instalar dependências do sistema
RUN apk update && apk add --no-cache \
    postgresql-client \
    curl \
    ca-certificates \
    tzdata

# Configuração do Node para build
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./
COPY theme.json ./

# Instalar TODAS as dependências (incluindo dev)
RUN npm install

# Copiar código-fonte
COPY client ./client
COPY server ./server
COPY shared ./shared
RUN mkdir -p ./public

# Executar build
RUN npm run build

# Segunda fase - imagem de produção
FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias para produção
RUN apk update && apk add --no-cache \
    postgresql-client \
    bash \
    curl \
    ca-certificates \
    tzdata \
    tini \
    netcat-openbsd

# Configurações de ambiente
ENV TZ=America/Sao_Paulo
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Copiar apenas os arquivos de produção
COPY package*.json ./
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/public ./public

# Instalar apenas dependências de produção
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar scripts
COPY init-db.sh ./
COPY start.sh ./
RUN chmod +x ./init-db.sh ./start.sh

# Aplicar segurança
RUN addgroup -S nodeapp && \
    adduser -S -G nodeapp nodeapp && \
    chown -R nodeapp:nodeapp /app
USER nodeapp

# Porta e entrypoint
EXPOSE 5000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./start.sh"]