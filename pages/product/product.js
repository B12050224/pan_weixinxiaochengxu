//获取应用实例    
var app = getApp()
Page({    
  data: {
	searchPageNum: 1,   //变量用来记录当前页数
	total:0,    //变量用来记录传来的总条数
	isShow:false,
	searchLoading: true, //变量用来记录 显示更多还是没有数据 的标识
  shopList: [],//自定义数组用来保存后台传来的当前页数据
	dongxi: [],  //自定义数组用来保存后台传来的第一页到当前页的数据
	keyWord:'',  //变量记录用户搜索输入的关键字
	flag: false,  //变量用来记录用户是点击了搜索拿的数据还是未点击拿的数据
	mark:false  //当用户在搜索框输入关键字完毕后下放是空白
  },
  fetchSearchList: function (){  //函数用来把当前页的数据存放到dongxi数组中去
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
					url:app.url+"api/shopShow?site_id=8050&language=7589",
					method:"GET",
					data:{
						page: into.data.searchPageNum
					},
					success: function(res) {
						if(res.data.code == 1) {
							//因为传来的数据是富文本，这里调用app.js中的方法进行解析，返回正常数据
							for(var i = 0;i<res.data.result.dataList.length;i++) {
									res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
							}
							//改变下数据条数的值 和 把当前页的数据存放到shopList中去
							into.setData({
									total: res.data.result.last_page,
									shopList:res.data.result.dataList
							})
						}
						//调用fetchSearchList方法，把当前页的数据放到dongxi数组
						into.fetchSearchList(); 
					}		
			});
	},
  //滚动到底部触发事件  
  searchScrollLower: function(){
    let that = this;  
		let word = that.data.keyWord; //获取用户输入的内容
	  if(that.data.searchPageNum < that.data.total-1) {
        that.setData({
		       	searchPageNum: that.data.searchPageNum+1
		    });
				if (!that.data.flag||word=='') { //若用户输入为空，或者flag为false执行未搜索函数
          that.jieKou(); 
					// console.log('此处执行的是未搜索时的函数1');
				} else {    //否则执行搜索时的函数
          that.searchNeirongEnd(); 
					// console.log('此处执行的是已搜索时的函数0');
				}	    	
	  } else {
				that.setData({  
			  	searchLoading: false, //"上拉加载"的变量，默认上拉加载更多，超出之后改变为没有更多数据了 
					mark: true 
				}); 
		}		 
  },
	//获取用户输入的搜索关键字
  words:function(e)
  {
		this.setData({
			keyWord: e.detail.value,
			searchPageNum: 1, 
			total:0, 
			searchLoading: false,  //用户输入内容时下放是空白
			mark: false,           //用户输入内容时下放是空白
			shopList: [],
			dongxi: []
		})	
  },
	//点击搜索事件
	searchNeirongStart: function(){
		// console.log('此处执行的是searchNeirongStart')
		let into = this;
		into.setData({
			dongxi:[],
			flag: true  //用户点击搜索后如果有数据就把标识变为true，重新渲染数据
		});			
	},
	searchNeirongEnd: function(){
		// console.log('此处执行的是searchNeirongEnd');
		let into = this;
		into.update();
		wx.request({
					url:app.url+"api/shopShow?site_id=8050&language=7589",
					method:"GET",
					data:{
						keywords: into.data.keyWord,
						page: into.data.searchPageNum
					},
					success: function(res) {
						if(res.data.code == 1) {
							for(var i = 0;i<res.data.result.dataList.length;i++) {
									res.data.result.dataList[i].content = app.convertHtmlToText(res.data.result.dataList[i].content);
							}							
							into.setData({
								flag: true,  //用户点击搜索后如果有数据就把标识变为true，重新渲染数据
								total: res.data.result.last_page,
								shopList:res.data.result.dataList
							});
							if(res.data.result.dataList.length!=6) { //搜到的内容小于6条，显示没有更多数据
								into.setData({
									searchLoading: false,
									mark:true
						   	});
							}
						}
						into.fetchSearchList();  //请求成功，把数据放到dongxi数组内，渲染
					}	
		});

	},
  onReady:function(){  //首次进入页面首先执行，只执行一次，只拿四个数据显示在页面
		
  },
  onShow: function() {

  },
  onLoad: function () {   
		let into = this;
    if(!into.data.flag) {
			// console.log('此处执行的是未搜索事件');
      into.jieKou();   //页面首次进入本页，未搜索渲染数据
		} else {
			// console.log('此处执行的是搜索事件');
      into.searchNeirongEnd(); //用户搜索关键字后渲染数据
		}		
  }    
}) 