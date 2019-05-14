
var util = require('../utils/util.js')

module.exports = {
  getData: (status, page) => {
    return util.post('/wxmp/api/plan/data', {
      status: status,
      page: page
    });
  },
  createPlan: (data) => {
    return util.post('/wxmp/api/plan/createPlan', data);
  },
  finishPlan: (planId) => {
    return util.post('/wxmp/api/plan/finishPlan', {
      planId: planId
    });
  },
  canclePlan: (planId) => {
    return util.post('/wxmp/api/plan/canclePlan', {
      planId: planId
    });
  },
  deletePlan: (planId) => {
    return util.post('/wxmp/api/plan/deletePlan', {
      planId: planId
    });
  }
}