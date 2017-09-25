$("#btn").click(function(ev){
	ev.stopPropagation();
	if($(this).hasClass("play")){
		audio.play();
		$(this).removeClass();
	}else{
		audio.pause();
		$(this).addClass("play");
	}
})

var mControler={
	server:"http://music.126.com/song.php?id=",
	play:function(id){
		$.ajax({
			type:"get",
			url:"data/music.json",
			async:true,
			success:function(data){
				var url = data[id].url;
				$("#audio").attr("src",url);
				var audio = $("#audio").get(0);
				audio.play();
				$("#btn").removeClass();
			}
		});
	}
}
