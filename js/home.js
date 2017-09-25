  //轮播图
  $(function(){
  	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    loop: true,
	    autoplay:2000,
	    autoplayDisableOnInteraction:false,
	    pagination: '.swiper-pagination'
  	})  
  })
  
  //请求数据
  function getPlaylist(callback){
  	if(checkcache()){
  		var list = JSON.parse(localStorage.playlists);
  		callback(list);
  		console.log("访问数据");
  	}else{
  		$.ajax({
  			type:"get",
  			url:"data/topPlayList.json",
  			async:true,
  			success:function(data){
  				var list = data.playlists;
  				callback(list);
  				localStorage.playlists = JSON.stringify(data.playlists); //把数据转换为字符串
  				localStorage.cacheTime = new Date().getTime(); 
  			}
  		});
  	}
  }
  
  //检查是否拥有本地缓存
  function checkcache(){
  	if(!localStorage.playlists){
  		return false;
  	}
  	var time = new Date().getTime() - localStorage.cacheTime;
  	if(time>8*1000){
  		return false;
  	}
  	return true;
  }
  
  //将数据写入
  getPlaylist(function(list){
  	var $songlist = $(".songlist")
  	var item = $("#songItem").html();
  	for(var i=0;i<list.length;i++){
  		var $item = $(item) //创建jq对象
  		$item.find("span").html(list[i].playCount+"&nbsp;&nbsp;");
  		$item.find("img").attr("src",list[i].coverImgUrl);
  		$item.find("p").html(list[i].name);
  		$item.find("a").attr("href","#detail?id="+list[i].id)
  		.click(function(){
  			 router("detail");
  		})
  		$songlist.append($item);
  }
});