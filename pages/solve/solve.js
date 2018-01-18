//获取应用实例    
var app = getApp()    
Page({    
data: {
  searchPageNum: 1,  
	total:0,
	searchLoading: true, //"上拉加载"的变量，默认false，隐藏 
  shopList: [],
	dongxi: [],
  imgUrl:"../../images/solve.png"
},   
  fetchSearchList: function (){
    let self = this;
    self.setData({   
      dongxi: self.data.dongxi.concat(self.data.shopList) //获取数据数组  
    });     
  },
	//接口参数，因为要多次使用，封为函数
  jieKou: function() {
    let into = this; 
    //产品展示接口
    wx.request({
        url:app.url+"api/resolve?site_id=8050&language=7589",
        method:"GET",
        data:{
            page: into.data.searchPageNum
        },
        success: function(res) {
          if(res.data.code == 1) {
            // console.log(res.data.result);
            for(var i = 0;i<res.data.result.dataList.length;i++) {
                    res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
            }
            into.setData({
                    total: res.data.result.last_page,
                    shopList:res.data.result.dataList
            })
        }
        into.fetchSearchList(); 
      }		
    });
	},
  //滚动到底部触发事件  
  searchScrollLower: function(){
    let that = this;   
    if(that.data.searchPageNum < that.data.total) {
    that.setData({
        searchPageNum: that.data.searchPageNum+1
    });
    that.jieKou(); 
    // console.log(that.data.searchPageNum);
    } else {
        that.setData({  
        searchLoading: false, //"上拉加载"的变量，默认上拉加载更多，超出之后改变为没有更多数据了  
        }); 
    }		 
  },
  onReady:function(){  //首次进入页面首先执行，只执行一次，只拿四个数据显示在页面

  },
  onShow: function() {

  },
  onLoad: function () {   
    let into = this;
    into.jieKou();   //页面进入调用一次接口，初步渲染页面
  }    
}) 