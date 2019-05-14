
var util = require('../utils/util.js')

module.exports = {
  login: (data) => {
    return util.post('/wxmp/api/login', data);
  }
}