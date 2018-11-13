# Global ban list

[![Build Status](https://travis-ci.org/CatalysmsServerManager/Global-ban-list.svg?branch=master)](https://travis-ci.org/CatalysmsServerManager/Global-ban-list)

This application keeps track of players that get banned from game servers. This data can then be shared between admins/servers.

## Installation

1. Install [NodeJs](https://nodejs.org/en/).
2. Clone this repo to your machine with `git clone`
3. Run `npm install` to install the dependencies
4. Copy `.env.example` to `.env`
5. Fill in the database connection info
6. Run the db seeding script `npm run db:seed`
7. `npm start`

## Tests

`npm test`

Run the mocha tests

`npm run lint`

Run ESLint to check code style.