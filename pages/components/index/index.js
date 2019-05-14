const planSer = require('../../../apis/plan.js');
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    tabCur: 0,
    tabCurTxt: 'R',
    scrollLeft: 0,
    listTouchStart: 0,
    listTouchDirection: null,
    modalName: null,
    loading: true,
    curPage: 1,
    plans: [],
    over: false,
  },
  
  lifetimes: {
    attached() {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      planSer.getData(1, 'R').then(res => {
        this.setData({
          loading: false,
          plans: res.list,
          over: res.over,
          curPage: 1
        });
        wx.hideLoading();
      }).catch(err => {
        this.setData({
          loading: false
        });
        wx.hideLoading();
      });
    }
  },

  methods: {
    getMorePlanData() {
      if (this.data.over) {
        return;
      }
      this.loadPlanData(this.data.curPage + 1, this.data.tabCurTxt);
    },
    loadPlanData(page, status, cb) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      this.setData({
        loading: true
      });
      planSer.getData(page, status).then(res => {
        var plans = this.data.plans;
        if (page > 1) {
          plans = plans.concat(res.list);
        } else {
          plans = res.list;
        }
        this.setData({
          loading: false,
          plans: plans,
          curPage: page,
          over: res.over
        });
        cb && cb();
        wx.hideLoading();
      }).catch(err => {
        cb && cb();
        wx.hideLoading();
      });
    },
    // ListTouch触摸开始
    listTouchStart(e) {
      this.setData({
        listTouchStart: e.touches[0].pageX
      })
    },
    // ListTouch计算方向
    listTouchMove(e) {
      this.setData({
        listTouchDirection: e.touches[0].pageX - this.data.listTouchStart < -50 ? 'left' : 'right'
      })
    },

    // ListTouch计算滚动
    listTouchEnd(e) {
      if (this.data.listTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        listTouchDirection: null
      })
    },

    tabSelect(e) {
      const _this = this;
      _this.loadPlanData(1, e.currentTarget.dataset.status, function() {
        _this.setData({
          listTouchStart: 0,
          modalName: null,
          listTouchDirection: null,
          tabCur: e.currentTarget.dataset.id,
          tabCurTxt: e.currentTarget.dataset.status,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
      })
    },

    toFinishPlan(e) {
      const _this = this;
      wx.showModal({
        title: '完成',
        content: '是否要将当前计划状态设置为已完成？',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '请稍后...',
              mask: true
            });
            planSer.finishPlan(e.currentTarget.dataset.planId).then(res => {
              wx.hideLoading();
              _this.loadPlanData(1, _this.data.tabCurTxt);
            }).catch(err => {
              wx.hideLoading();
              wx.showToast({
                title: '操作失败！',
                icon: 'none'
              });
            });
          }
        }
      });
    },

    toCanclePlan(e) {
      const _this = this;
      wx.showModal({
        title: '取消',
        content: '是否要取消当前计划？',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '请稍后...',
              mask: true
            });
            planSer.canclePlan(e.currentTarget.dataset.planId).then(res => {
              wx.hideLoading();
              _this.loadPlanData(1, _this.data.tabCurTxt);
            }).catch(err => {
              wx.hideLoading();
              wx.showToast({
                title: '操作失败！',
                icon: 'none'
              });
            });
          }
        }
      });
    },

    toDeletePlan(e) {
      const _this = this;
      wx.showModal({
        title: '删除',
        content: '是否要删除当前计划？',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '请稍后...',
              mask: true
            });
            planSer.deletePlan(e.currentTarget.dataset.planId).then(res => {
              wx.hideLoading();
              _this.loadPlanData(1, _this.data.tabCurTxt);
            }).catch(err => {
              wx.hideLoading();
              wx.showToast({
                title: '操作失败！',
                icon: 'none'
              });
            });
          }
        }
      });
    }
  }
})