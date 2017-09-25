//显示器适配

function fontSize(){
	var _html = document.getElementsByTagName("html")[0];
	var w = w>750? 750:document.documentElement.clientWidth;
	_html.style.fontSize = w/3.75+"px";
}
fontSize();
window.onresize = fontSize;

//根据url路径找到地址参数
function getUrlParams(){
	var url = window.location.href;
	var arr = url.split("?");
	var str = arr[1];
	var parr = str.split("&");
	var params = {};
	
	for(var i=0;i<parr.length;i++){
		var p = parr[i];
		var kv = p.split("=");
		params[kv[0]] = kv[1];
	}
	return params;
}

//根据Url路径获取模块名
function getM(){
	var url = window.location.href;
	var arr = url.split("#");
	if(arr.length == 2){
		var parr = arr[1].split("?");
		var m = parr[0];
	}
	return m;
}

//加载对应模块到页面
function router(m,$container){
	$container = $container || $("#share");
	$.ajax({
		url:"views/"+m+".html",
		success:function(data){
			$container.html(data);
			
			loadjs(m);	
			
		}
	});
}


//动态载入js文件
function loadjs(m){
	$.ajax({
		type:"get",
		url:"js/"+m+".js",
		async:true
	});
}

//加载顶部导航条
$(function(){
	router("top");
	router("audio",$("#global"));
})



