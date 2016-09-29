window.onload = function(){
	document.getElementsByClassName("banner")[0].style.display = "block"
}

function showBanner(id){
	var banners = document.getElementsByClassName("banner");
	for(var i=0;i<banners.length;i++){
		banners[i].style.display = "none"
	}
	document.getElementById(id).style.display = "block"
}