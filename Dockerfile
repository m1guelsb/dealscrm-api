FROM node:18-alpine

WORKDIR /app

COPY . .
COPY ./.env.prod ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run prisma:migrate

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]