# Global ban list

[![Build Status](https://travis-ci.org/CatalysmsServerManager/Global-ban-list.svg?branch=master)](https://travis-ci.org/CatalysmsServerManager/Global-ban-list)
![Coveralls github](https://img.shields.io/coveralls/github/CatalysmsServerManager/Global-ban-list.svg)
[![Discord](https://img.shields.io/discord/506805655454089216.svg)](https://discordapp.com/invite/eh4h2uF)
[![GitHub release](https://img.shields.io/github/release/CatalysmsServerManager/Global-ban-list.svg)](https://github.com/CatalysmsServerManager/Global-ban-list/releases)

This application keeps track of players that get banned from game servers. This data can then be shared between admins/servers.

## Installation

1. Install [NodeJs](https://nodejs.org/en/).
2. Clone this repo to your machine with `git clone`
3. Run `npm install --only=prod` to install the dependencies
4. Copy `.env.example` to `.env`
5. Fill in the database connection info
6. Initialise database `npm run db:init`
7. `npm start`

## Configuration

- Set the port with environment variable PORT.

## Tests

`npm test`

Run the mocha tests

`npm run lint`

Run ESLint to check code style.