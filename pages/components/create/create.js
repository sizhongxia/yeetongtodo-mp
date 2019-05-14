Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    planContent: '',
    importanceLevel: 3,
    urgentLevel: 3,
    dueAt: '2019-08-11',
    loading: false
  },

  lifetimes: {
    attached() {
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
      this.setData({
        dueAt: year + seperator1 + month + seperator1 + strDate
      });
    }
  },

  methods: {
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
      console.info(e.detail)
      this.setData({
        loading: true
      })
    } 
  }
})