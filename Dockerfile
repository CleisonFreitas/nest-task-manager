FROM node:24-alpine

# Diretório interno
WORKDIR /app

# Copia package primeiro (cache de dependências)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Compila (caso use build)
RUN npm run build

# Porta do Nest
EXPOSE 3000

# Inicia aplicação
CMD ["npm", "run", "start:prod"]