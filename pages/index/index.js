const util = require('../../utils/util.js')
const authSer = require('../../apis/auth.js')

Page({
  data: {
    pageCur: '',
    animationData: {}
  },
  onReady() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    util.login().then(code => {
      authSer.login({
        code: code
      }).then(token => {
        wx.setStorageSync('token', token);
        wx.hideLoading();
        this.setData({
          pageCur: 'index'
        });
      }).catch(err => {
        wx.redirectTo({
          url: '/pages/auth/auth',
          complete() {
            wx.hideLoading();
          }
        });
      });
    }).catch(err => {
      wx.hideLoading();
    })
  },
  onShow() {
    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
      delay: 0,
      transformOrigin: '100% 50% 0'
    })
  },
  navChange(e) {
    const _this = this;
    _this.animation.rotate(90).step().rotate(0).step();
    var animationData = _this.data.animationData;
    animationData[e.currentTarget.dataset.cur] = _this.animation.export();
    _this.setData({
      pageCur: e.currentTarget.dataset.cur,
      animationData: animationData
    })
    setTimeout(() => {
      _this.animation.opacity(1).step();
      var animationData = _this.data.animationData;
      animationData[e.currentTarget.dataset.cur] = _this.animation.export();
      _this.setData({
        animationData: animationData
      })
    }, 200)
  },
  onShareAppMessage() {
    return {
      title: '一个小巧的TODO计划管理小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
  onReachBottom: function () {
    this.selectComponent("#indexTemplate").getMorePlanData()
  }
})