## Tasks API
API RESTful desenvolvida com foco em arquitetura moderna, separação de responsabilidades e uso de múltiplos bancos de dados.

O projeto implementa:

- Autenticação com JWT
- CRUD de tarefas
- Controle de acesso por usuário
- Armazenamento híbrido (SQL + NoSQL)
- Documentação automática com Swagger
- Execução containerizada com Docker

### Arquitetura
A aplicação é dividida em três principais camadas:

- API (NestJS) → Responsável pelas regras de negócio e autenticação
- MySQL → Armazena usuários e tarefas
- MongoDB → Armazena metadados das tarefas (histórico e tags)

### Tecnologias Utilizadas
#### Backend
- NestJS
- TypeScript
- TypeORM
- Mongoose
- Passport
- Swagger

#### Banco de Dados

- MySQL
- MongoDB

#### Infraestrutura

- Docker
- Docker Compose

### Setup Automatizado(Necessário Docker)
1 - Dar permissão ao script (Linux / Mac)
```bash
chmod +x setup.sh
```
2 - Executar o script
```bash
./setup.sh
```
Se tudo ocorrer corretamente, a aplicação estará disponível em:
- API → http://localhost:3000
- Swagger → http://localhost:3000/docs

### Execução sem Docker
Embora o projeto seja pensado para containerização, é possível rodá-lo manualmente.

#### Requisitos
- Node.js v24+
- MySQL instalado localmente
- MongoDB instalado localmente

1 - Criar .env
```bash
cp .env.example .env
```
Configure as variáveis para apontar para seus bancos locais:
```
DATABASE_HOST=localhost
MONGO_URI=mongodb://localhost:27017/tasksmetadata
```

2 - Crie um banco de dados MySQL e defina usuário e senha nas variáveis de ambiente do arquivo .env

3 - Instalando dependências
```bash
npm install
```
Então rodar a aplicação:
```bash
npm run start:dev
```

### Documentação da API
A documentação interativa é gerada automaticamente via Swagger:
```Code
http://localhost:3000/docs
```