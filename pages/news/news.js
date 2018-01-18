//获取应用实例    
var app = getApp()    
Page({    
  data: { 
	imgUrl:"../../images/news.jpg",
  scrollTop: 10,
  searchPageNum: 1,  
	total:0,
	searchLoading: true, //"上拉加载"的变量，默认false，隐藏 
  shopList: [],
	dongxi: []			
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
    //接口参数
    wx.request({
          url:app.url+"api/news?site_id=8050&language=7589",
          data:{
            page: into.data.searchPageNum
          },
          method:"GET",
          success: function(res) {
            if(res.data.code == 1) {
              // console.log(res.data.result.dataList);
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
	  } else {
				that.setData({  
			  	searchLoading: false, //"上拉加载"的变量，默认上拉加载更多，超出之后改变为没有更多数据了  
				}); 
		}		 
  },
  onLoad: function () {    
		let into = this;
		into.jieKou();   //页面进入调用一次接口，初步渲染页面
  }    
}) 