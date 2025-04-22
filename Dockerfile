# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera os arquivos do Prisma
RUN npx prisma generate

# Etapa 2: Produção
FROM node:18-alpine AS production

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expõe a porta
EXPOSE 3030

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
