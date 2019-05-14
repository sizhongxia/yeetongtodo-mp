const util = require('../../../utils/util.js')
const planSer = require('../../../apis/plan.js');
const authSer = require('../../../apis/auth.js')

Component({
  options: {
    addGlobalClass: true,
  },
  
  data: {
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
        this.setData({
          loading: false,
          plans: res.list,
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
      if (this.data.tabCur == 1) {
        this.setData({
          listTouchStart: 0,
          modalName: null,
          listTouchDirection: null
        })
        return;
      }
      this.setData({
        listTouchStart: e.touches[0].pageX
      })
    },
    // ListTouch计算方向
    listTouchMove(e) {
      if (this.data.tabCur == 1) {
        this.setData({
          modalName: null,
          listTouchDirection: null
        })
        return;
      }
      this.setData({
        listTouchDirection: e.touches[0].pageX - this.data.listTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    listTouchEnd(e) {
      if (this.data.tabCur == 1) {
        this.setData({
          modalName: null,
          listTouchDirection: null
        })
        return;
      }
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
    }
  }
})