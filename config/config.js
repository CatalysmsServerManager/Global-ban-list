// Load environment config variables
require('dotenv').config();


module.exports = {
  dev: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING',
    logging: false,
    dialect: 'mysql',
  },
  test: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING',
    logging: false,
    dialect: 'mysql',
  },
  production: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING',
    dialect: 'mysql',
  }
}