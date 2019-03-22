// Load environment config variables
require('dotenv').config();


module.exports = {
  dev: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING',
    logging: false,
  },
  test: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING',
    logging: false
  },
  production: {
    url: process.env.DBSTRING,
    use_env_variable: 'DBSTRING'
  }
}