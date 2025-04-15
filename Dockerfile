FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk update && apk add --no-cache \
    postgresql-client \
    bash \
    curl \
    ca-certificates \
    tzdata \
    tini \
    netcat-openbsd

# Definir timezone
ENV TZ=America/Sao_Paulo

# Configurações de Node para ambiente de produção
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./
COPY theme.json ./

# Copiar scripts de inicialização
COPY init-db.sh ./
COPY start.sh ./
RUN chmod +x ./init-db.sh ./start.sh

# Instalar dependências, ignorando devDependencies
RUN npm ci --only=production

# Instalar somente dependências de desenvolvimento necessárias para o build
RUN npm install --no-save vite esbuild @vitejs/plugin-react

# Copiar código-fonte
COPY client ./client
COPY server ./server
COPY shared ./shared

# Criar diretório public vazio (caso não exista no repositório)
RUN mkdir -p ./public

# Construir o projeto
RUN npm run build

# Limpar cache e arquivos temporários
RUN npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/*

# Usuário não-privilegiado para executar a aplicação
RUN addgroup -S nodeapp && \
    adduser -S -G nodeapp nodeapp && \
    chown -R nodeapp:nodeapp /app
USER nodeapp

# Expor a porta
EXPOSE 5000

# Usar tini como init para lidar com sinais e processos zumbis
ENTRYPOINT ["/sbin/tini", "--"]

# Comando para iniciar o servidor
CMD ["./start.sh"]