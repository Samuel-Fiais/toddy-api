# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências para o contêiner
COPY package*.json tsconfig.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte da aplicação para o contêiner
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta em que a aplicação irá escutar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
