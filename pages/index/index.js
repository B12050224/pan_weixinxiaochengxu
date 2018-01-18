//获取应用实例    
var app = getApp();   
let qieGe = require('../units/units.js'); 
Page({    
  data: {
  	newList: [],
    gt:">",
    fenlei: [],  //分类数组
    standars: [],//图文列表(水平)数组
    movies:[],   //轮播图数组 
    list24: [], //解决方案数组    
}, 
  onShareAppMessage: function () {  //小程序首页转发功能
    return {
      title: '展示类小程序',
      desc: '盘石新经济平台展示类小程序',
      path: '/page/user?id=123',
    }
  },
  onLoad: function () {  
    var into = this;
    
    //首页轮播图接口
    wx.request({
        url:app.url+"api/slider?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            let arr = [];
            arr = qieGe.qieGe(res.data.result.dataList,6);
            into.setData({
                movies:arr
            })
          }  
        }
    });
    //首页分类接口
    wx.request({
        url:app.url+"api/classific?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            // console.log(res.data.result);
            into.setData({
                fenlei:res.data.result,
            })
          }  
        }
    });

    //首页图文列表水平接口
    wx.request({
        url:app.url+"api/shopShow?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            let arr = [];
            arr = qieGe.qieGe(res.data.result.dataList,6);
              into.setData({
                  standars:arr
              })
          }
        }
    });

    //首页新闻中心接口
    wx.request({
        url:app.url+"api/news?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            let arr = [];
            arr = qieGe.qieGe(res.data.result.dataList,3);
              into.setData({
                  newList:arr
              })
          }
        }
    });

    //首页解决方案接口
    wx.request({
        url:app.url+"api/resolve?site_id=8050&language=7589",
        method:"GET",
        success: function(res) {
          if(res.data.code == 1) {
            let arr = [];
            arr = qieGe.qieGe(res.data.result.dataList,2);
            for(var i = 0;i<arr.length;i++) {
              arr[i].content = app.convertHtmlToText(arr[i].content);
            }
            into.setData({
                  list24:arr
              })
          }
        }
    });    
  }
}) 
