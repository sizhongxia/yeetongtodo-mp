
const userSer = require('../../../apis/user.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    isZan: false
  },

  lifetimes: {
    attached() {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      userSer.getUserLike().then(res => {
        this.setData({
          isZan: res
        });
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
      });
    }
  },

  methods: {
    toZan() {
      if (this.data.isZan) {
        wx.showToast({
          title: '您已点赞，感谢您的支持！',
          icon: 'none'
        });
        return;
      }
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      userSer.setUserLike().then(res => {
        this.setData({
          isZan: res
        });
        wx.showToast({
          title: '感谢您的支持！',
          icon: 'none'
        });
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
      });
    },

    toOtherMp() {
      wx.navigateToMiniProgram({
        appId: 'wxb4bab327bf7710a4',
        path: 'pages/auth/login/login',
        envVersion: 'release',
        success(res) {
        },
        fail () {
          wx.showToast({
            title: '打开另一个小程序失败！',
            icon: 'none'
          });
        }
      })
    }
  }
})
