const util = require('../../utils/util.js')
const authSer = require('../../apis/auth.js')

const app = getApp();
Page({
  data: {
  },
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      util.login().then(code => {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: (res) => {
            const userInfo = res.userInfo;
            userInfo.rawData = res.rawData;
            userInfo.encryptedData = res.encryptedData;
            userInfo.iv = res.iv;
            userInfo.signature = res.signature;
            userInfo.code = code;
            authSer.login(userInfo).then(token => {
              wx.redirectTo({
                url: '/pages/index/index',
                complete: () => {
                  wx.hideLoading();
                }
              })
            }).catch(err => {
              wx.hideLoading();
            })
          }
        })
      }).catch(err => {
        wx.hideLoading();
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请点击“允许”按钮进行微信授权',
        confirmText: '确定',
        confirmColor: '#e95410',
        showCancel: false
      })
    }
  }
});
