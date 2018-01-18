//获取应用实例    
var app = getApp()    
Page({    
  data: {
    dataList: {},
    flag:false,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      // latitude: 30.336199334,
      // longitude: 120.1129513979,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        latitude: 0,
        longitude: 0
      }, {
        latitude: 0,
        longitude: 0
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad: function () {  
    let self = this;
    //拼接字符串用来改变数组中的某一属性
    let mLa = "markers[" + 0 + "].latitude", 
        mLo = "markers[" + 0 + "].longitude",
        pLa0 = "polyline[" + 0 + "][" + 0 + "].latitude",
        pLo0 = "polyline[" + 0 + "][" + 0 + "].longitude",
        pLa1 = "polyline[" + 0 + "][" + 1 + "].latitude",
        pLo1 = "polyline[" + 0 + "][" + 1 + "].longitude"
    wx.request({
        url:app.url+"api/connect?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
              self.setData({
                  dataList:res.data.result,
                  //改变数组或对象中某一属性的样式
                  [mLa]:res.data.result.latitude,
                  [mLo]:res.data.result.longitude,
                  [pLa0]:res.data.result.latitude,
                  [pLo0]:res.data.result.longitude,
                  [pLa1]:res.data.result.latitude,
                  [pLo1]:res.data.result.longitude,
              });
              if(self.data.dataList.contact===''|| self.data.dataList.contact==null){
                self.setData({
                  flag: true
                });
              }
          }  
        }
    });  
  }    
}) 