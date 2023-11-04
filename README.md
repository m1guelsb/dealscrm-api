<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

<p align="center">
  <a href="https://m1guelsb.com">
  </a>
</p>
<p align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript&logoColor=blue"/>

  <img alt="NestJs" src="https://img.shields.io/badge/nestjs-black?style=for-the-badge&logo=nestjs&logoColor=e0234e"/>

  <img alt="Prisma" src="https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma&logoColor=white"/>

  <img alt="Postgres" src="https://img.shields.io/badge/postgresql-black.svg?style=for-the-badge&logo=postgresql&logoColor=%2361DAff"/>
</p>

<p align="center">
  <a href="https://github.com/m1guelsb/dealscrm-api/actions/workflows/build-test-deploy.yml" target="_blank">
    <img src="https://github.com/m1guelsb/dealscrm-api/actions/workflows/build-test-deploy.yml/badge.svg"/>
  </a>
  <a href="https://twitter.com/m1guelsb" target="_blank">
    <img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"/>
  </a>
</p>

## About 🔎
<a href="https://github.com/m1guelsb/deals-crm" target="_blank">Deals CRM</a> back-end

Customer Relationship Management platform where you can manage customers, earnings, deals and tasks.

---
## Tech Stack 🔧
<p>
  <img title="Typescript" src="https://skillicons.dev/icons?i=ts" height="48" />
  <img title="nestjs" src="https://skillicons.dev/icons?i=nestjs" height="48" />
  <img title="prisma" src="https://skillicons.dev/icons?i=prisma" height="48" />
  <img title="postgres" src="https://skillicons.dev/icons?i=postgres" height="48" />
</p>

---
## How to run 🏃
1. Rename `.env.example` to `.env`, and fill the variables with your postgres database url.

2. In the terminal:
```bash
# install dependencies
$ npm install

# start your docker db
$ npm run db:dev:up

# apply prisma migrations
$ npm run prisma:migrate

# start the server
$ npm run start:dev

# to run automated tests
$ npm run test:e2e
```

