// Grab the gifs from the Giphy API using AJAX

var url = "tv.giphy.com/v1/gifs/tv?api_key=CW27AW0nlp5u0&tag=giphytv";
var url2 = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"
var giphyAJAX = new XMLHttpRequest();
giphyAJAX.open('GET', url2);
giphyAJAX.send();
giphyAJAX.addEventListener('load', function(e){
	var data = JSON.parse(e.target.response).data;
	console.log(data);
	pushToDOM(data);
})

function pushToDOM(data){
	var container = document.querySelector(".js-container");
	var x = 0;
	data.forEach(function(image){
		setTimeout(function(){
			var imageUrl = image.images.original.url;
			container.innerHTML = "<img src=\"" + imageUrl + "\">";
		}, 5000 * x); // refresh every 5 seconds
		x++;
	})
}
