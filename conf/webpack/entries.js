const environment = require('./../environment')
const environments = {
  development: require('./entries/development'),
  production: require('./entries/production'),
  test: require('./entries/test')
}

module.exports = environments[environment]
