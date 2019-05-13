Page({
  data: {
    PageCur: 'index'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '一个小巧的TODO计划管理小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})