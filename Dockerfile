FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias para o PostgreSQL
RUN apk add --no-cache postgresql-client

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./

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

# Comando para iniciar o servidor
CMD ["npm", "start"]