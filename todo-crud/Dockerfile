# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do frontend
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do frontend
EXPOSE 3000

# Comando para rodar o frontend
RUN npm run build
CMD ["npm", "start"]
