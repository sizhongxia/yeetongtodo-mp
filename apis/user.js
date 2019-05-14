
var util = require('../utils/util.js')

module.exports = {
  userInfo: () => {
    return util.post('/wxmp/api/user/userInfo', {});
  },
  getUserLike: () => {
    return util.post('/wxmp/api/user/getUserLike', {});
  },
  setUserLike: () => {
    return util.post('/wxmp/api/user/setUserLike', {});
  }
}