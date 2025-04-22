# Etapa 1: build (instala dependências, gera Prisma Client)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# Etapa 2: imagem final limpa
FROM node:18-alpine

WORKDIR /app

# Copia apenas arquivos necessários da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

EXPOSE 3030
CMD ["npm", "run", "start"]
