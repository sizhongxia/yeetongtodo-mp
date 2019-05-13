Component({
  options: {
    addGlobalClass: true,
  },
  data: {
  },

  methods: {
    onEditorReady(e) {
      const that = this
      console.info(wx.createSelectorQuery())
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec();
    },
    onEditorInput(e) {
      console.info(e)
    },
    onEditorStatusChange(e) {
      console.info(e)
    }
  }
})