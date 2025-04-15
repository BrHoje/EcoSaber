# EcoSaber - Educação para um Futuro Sustentável

![EcoSaber Logo](https://static.wixstatic.com/media/977b37_7e9c4c19bbea4a5dbe1ed07f57f89a45~mv2.png/v1/fill/w_200,h_95,al_c,q_90/977b37_7e9c4c19bbea4a5dbe1ed07f57f89a45~mv2.png)

EcoSaber é uma plataforma web desenvolvida como parte do projeto de extensão universitária "Projeto de Extensão II" em Publicidade e Propaganda, focada em promover o ODS 4 (Educação de Qualidade) e a educação para o desenvolvimento sustentável.

## Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Visão Geral

EcoSaber é uma plataforma web que conecta educadores, estudantes e comunidades interessadas em promover a educação para o desenvolvimento sustentável. O projeto oferece:

- Biblioteca de recursos educacionais sobre sustentabilidade
- Informações sobre o ODS 4 (Educação de Qualidade)
- Estatísticas de impacto e depoimentos de participantes
- Formulário para participação no projeto
- Acessibilidade avançada com leitura de texto, ajuste de contraste e tamanho de fonte
- Suporte multilíngue (Português/Inglês)

## Requisitos

Para executar este projeto, você precisará:

- Node.js (versão 18.x ou superior)
- PostgreSQL (versão 14.x ou superior)
- Git

## Instalação

Siga estas etapas para configurar o projeto em seu ambiente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ecosaber.git
   cd ecosaber
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

### Opção 1: Instalação com Banco de Dados Vazio

1. Crie um banco de dados PostgreSQL para o projeto:
   ```bash
   createdb ecosaber
   ```

2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/ecosaber
   ```

3. Execute as migrações do banco de dados:
   ```bash
   npm run db:push
   ```

### Opção 2: Importar Banco de Dados Existente com Dados

Para garantir que você tenha todos os dados existentes (recursos, estatísticas, depoimentos, etc.):

#### Usando o Backup Existente

1. Baixe o arquivo de backup `ecosaber_backup.dump` da raiz do projeto

2. No novo servidor, crie um banco de dados vazio:
   ```bash
   createdb ecosaber
   ```

3. Importe os dados do dump:
   ```bash
   pg_restore -U usuário -d ecosaber -v ecosaber_backup.dump
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/ecosaber
   ```

#### Criando um Novo Backup (se necessário)

Se você precisar criar um novo backup do banco de dados:

1. No servidor original, exporte o banco de dados:
   ```bash
   pg_dump -U usuário -d ecosaber -Fc -f ecosaber_data.dump
   # OU se estiver usando uma URL de conexão
   pg_dump -Fc "postgresql://usuario:senha@localhost:5432/ecosaber" > ecosaber_data.dump
   ```

2. Transfira o arquivo `ecosaber_data.dump` para o novo servidor e siga as etapas 2-4 acima.

### Esquema do Banco de Dados

O esquema do banco de dados está definido no arquivo `shared/schema.ts` e inclui as seguintes tabelas:

- **users**: Usuários da plataforma (administradores)
- **participants**: Pessoas que se cadastraram para participar do projeto
- **resources**: Recursos educacionais disponíveis na plataforma
- **testimonials**: Depoimentos de participantes do projeto
- **stats**: Estatísticas e métricas de impacto do projeto

Para visualizar o esquema completo, consulte o arquivo `shared/schema.ts` no código-fonte.

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`.

Para construir e executar para produção:

```bash
npm run build
npm start
```

## Estrutura do Projeto

O projeto segue uma arquitetura moderna de aplicação web:

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── lib/            # Utilitários e configurações
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── translations/   # Arquivos de tradução
│   │   ├── App.tsx         # Componente principal
│   │   └── main.tsx        # Ponto de entrada
│   └── index.html          # Template HTML
├── server/                 # Backend Node.js/Express
│   ├── routes.ts           # Definições de rotas API
│   ├── storage.ts          # Interface de armazenamento
│   ├── db.ts               # Configuração do banco de dados
│   ├── pdfTemplate.ts      # Template geração de PDF
│   └── index.ts            # Ponto de entrada do servidor
├── shared/                 # Código compartilhado
│   └── schema.ts           # Definições de esquema/modelo
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
└── vite.config.ts          # Configuração do Vite
```

## Características

- **Frontend Responsivo**: Design adaptável para mobile, tablet e desktop
- **API RESTful**: Backend com Express para gestão de dados
- **Banco de Dados Relacional**: PostgreSQL com ORM Drizzle
- **Internacionalização**: Suporte multilíngue com i18next
- **Acessibilidade**: Recursos avançados de acessibilidade incluindo:
  - Leitor de texto (Text-to-Speech)
  - Ajuste de tamanho de fonte
  - Modos de contraste (Alto contraste, Daltonismo, Escala de cinza)
- **Geração de PDF**: Exportação de documentação do projeto em PDF

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI
  - React Query
  - i18next (internacionalização)

- **Backend**:
  - Node.js
  - Express
  - Drizzle ORM
  - PostgreSQL
  - Zod (validação)

- **Ferramentas**:
  - Vite (build e desenvolvimento)
  - ESLint/TypeScript (linting e verificação de tipos)

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido como parte do curso de Publicidade e Propaganda - Projeto de Extensão II - 2025