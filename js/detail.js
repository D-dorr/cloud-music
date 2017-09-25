//返回首页
$(".back").click(function(){
	router("top");
})

var params = getUrlParams();
var id = params.id;

function getlist(callback){
	$.ajax({
		type:"get",
		url:"data/playlist.json",
		async:true,
		success:function(data){
			callback(data.playlist.tracks);
		}
	});
}

getlist(function(list){
	var $songlist = $("#songlist");
	var item = $("#songItem").html();
	for(var i=0;i<list.length;i++){
		$item = $(item);
		var music = list[i];
		$item.find(".music").html(list[i].name);
		$item.find(".artist").html(list[i].ar[0].name);
		$item.data("music",music).click(function(){
			  $("#global").css("display","block");
			  $("#global").find(".music").html($(this).data("music").name);
			  $("#global").find(".artist").html($(this).data("music").ar[0].name);
			  console.log($(this).data("music").id);
			  mControler.play($(this).data("music").id);
		});

		$songlist.append($item)
	}
})
