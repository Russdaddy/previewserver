$(document).ready(function(){
	$('.btn').on('mouseenter',function(){
		$(this).toggleClass('active');
	});

	$('.btn').on('mouseleave',function(){
		$(this).toggleClass('active');
	});
})

// function showBanner(id){
// 	var banners = document.getElementsByClassName("banner");
// 	for(var i=0;i<banners.length;i++){
// 		banners[i].style.display = "none";
// 	}
// 	document.getElementById(id).style.display = "block";
// 	document.getElementById(id).contentWindow.location.reload();
// }
