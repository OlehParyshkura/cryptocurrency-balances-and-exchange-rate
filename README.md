
## Description

Test task Nest.js Cryptocurrency exchange rates and balances

General information
The system to be developed is part of some fintech application. It supports the following
types of cryptocurrencies with their standard symbols. They are also used on mobile
clients so that only they should be used in all external interfaces, API requests, and
responses: Bitcoin - BTC
Bitcoin Cash - BCH
Ethereum - ETH
Tasks
1. It is necessary to develop an API that will allow you to get the exchange rate of one
   or more cryptocurrencies to one or more fiat currencies (USD, EUR, CAD, JPY,
   GBP, CHF, AUD). The exchange rate must be based on the information from
   https://docs.kraken.com/websockets/. At the same time, the API should work as
   quickly as possible, so the exchange rates must be received and updated on an
   ongoing basis, and when the API is requested, the latest relevant data should be
   returned.
2. In the system there is a list of accounts. Each of them has a balance in some
   crypto asset and reference fiat currency (both can be generated randomly). Each
   day at 00:00 the system should calculate and store the balance of each specific
   account in the reference currency according to the latest exchange rate.
   Implementation requirements
1. All the code should be properly typed, no any types are allowed.
2. The code must be written in the same style.
3. The code should be written according to the SOLID principles and other best
   practices in terms of architecture and code organization.
4. Prefer using NestJS framework for the implementation.
5. Prefer using PostgreSQL as a database.
6. Prefer using Prisma ORM to interact with the database.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# init database
$ docker compose up

# migrate database
$ npm run prisma:dev:deploy

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
