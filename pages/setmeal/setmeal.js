//获取应用实例    
var app = getApp()    
Page({    
  data: {    
     index: 0,
     movies:[]
  },   
  onLoad: function (options) {   
    let into = this;
    this.setData({
      index: options.index
    })
    let that = into.data.index;
    //接口
    wx.request({
        url:app.url+"api/resolve?site_id=8050&language=7589",
        data:{
          id:that
        },
        method:"GET",
        success: function(res) {
          for(var i = 0;i<res.data.result.dataList.length;i++) {
              res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
          }
          if(res.data.code == 1) {
              into.setData({
                  movies:res.data.result.dataList
              })
          }
        }
    }); 
  }    
}) 