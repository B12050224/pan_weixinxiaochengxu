//获取应用实例    
var app = getApp()    
Page({    
  data: {
    movies:[],
    imgList1:[
      // '../../images/3.jpg'
    ],
    index: 0
  },   
  onLoad: function(options) {
    let self = this;
    this.setData({
      index: options.index
    })
    let into = self.data.index;
    wx.request({
        url:app.url+"api/shopShow?site_id=8050&language=7589",
        data:{
          id:into
        },
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            // console.log(res.data.result.dataList);
            for(var i = 0;i<res.data.result.dataList.length;i++) {
                res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
                res.data.result.dataList[i].brief = app.convertHtmlToText(res.data.result.dataList[i].brief);
            }
              self.setData({
                  movies:res.data.result.dataList
              })
          }
        }      
    });
  }    
}) 