FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]