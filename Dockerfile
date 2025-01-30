# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do backend
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do backend
EXPOSE 4000

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]
