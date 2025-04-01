# Imagen base con Node.js + Alpine
FROM node:21-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run","start"]
