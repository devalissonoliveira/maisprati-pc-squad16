# Usar uma imagem base do Node com a versão 16-alpine para um tamanho reduzido
FROM node:16-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar dependências do projeto
RUN npm install

# Copiar o código da aplicação para o diretório de trabalho
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Instalar o servidor web HTTP
RUN npm install -g serve

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["serve", "-s", "build"]