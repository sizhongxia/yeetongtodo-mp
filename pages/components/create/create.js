const planSer = require('../../../apis/plan.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    planContent: '',
    importanceLevel: 3,
    urgentLevel: 3,
    dueAt: '',
    loading: false
  },


  lifetimes: {
    attached() {
      this.setData({
        dueAt: this.nowDate()
      });
    }
  },

  methods: {
    nowDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      return year + seperator1 + month + seperator1 + strDate;
    },
    onChangeImportanceLevel(e) {
      this.setData({
        importanceLevel: e.currentTarget.dataset.val
      });
    },
    onChangeUrgentLevel(e) {
      this.setData({
        urgentLevel: e.currentTarget.dataset.val
      });
    },
    onDateChange(e) {
      this.setData({
        dueAt: e.detail.value
      });
    },
    toSubmit(e) {
      const planContent = e.detail.value.planContent;
      if (!planContent) {
        wx.showToast({
          title: '请输入计划内容',
          icon: 'none'
        });
        return;
      }
      const dueAt = e.detail.value.dueAt;
      if (!dueAt) {
        wx.showToast({
          title: '请选择计划预计完成日期',
          icon: 'none'
        });
        return;
      }
      this.setData({
        loading: true
      })
      planSer.createPlan({
        planContent: planContent,
        importanceLevel: this.data.importanceLevel,
        urgentLevel: this.data.urgentLevel,
        dueAt: dueAt,
        formId: e.detail.formId
      }).then(res => {
        this.setData({
          planContent: '',
          importanceLevel: 3,
          urgentLevel: 3,
          dueAt: this.nowDate(),
          loading: false
        });
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        });
      }).catch(err => {
        this.setData({
          loading: false
        });
        wx.showToast({
          title: '添加失败！',
          icon: 'none'
        });
      })
    } 
  }
})