# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# Se precisar de algum build (ex: TypeScript), mantenha a linha abaixo
# RUN npm run build

# Etapa 2: imagem final limpa
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/. ./  # copia o restante da aplicação

EXPOSE 3030
CMD ["npm", "run", "start"]
