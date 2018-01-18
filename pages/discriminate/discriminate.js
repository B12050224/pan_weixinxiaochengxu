//获取应用实例    
var app = getApp()    
Page({    
  data: {
     index: 0,    
     list2: [] 
  },   
  onLoad: function (options) {    
    var that = this;
    that.setData({
      mername: options.id,
      index: options.id1
    })
    wx.setNavigationBarTitle({
      title: that.data.mername//页面标题为路由参数
    })
    
    let into = that.data.index;
    //后台接口
    wx.request({
      url:app.url+"api/news?site_id=8050&language=7589",
      data: {
        id:into
      },
      method:"GET",
      success: function(res) {
        // console.log(res.data.result.dataList);
        if(res.data.code == 1) {
            for(var i = 0;i<res.data.result.dataList.length;i++) {
                res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
            }
            that.setData({
                list2:res.data.result.dataList
            })
        }
      }      
    });
  }    
}) 