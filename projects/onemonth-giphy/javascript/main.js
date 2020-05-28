// 1. Grab the input

document.querySelector('.js-go').addEventListener("click", function(){
	var input = document.querySelector("input").value;
	var url = "https://api.giphy.com/v1/gifs/search?q=" + input.replace(" ", "+") + "&api_key=dc6zaTOxFJmzC";
	ajaxRequest(url);
});


document.querySelector('.js-userinput').addEventListener("keyup", function(e){

	var input = document.querySelector("input").value;
	// If Enter is pressed
	if (e.which === 13) {
		var url = "https://api.giphy.com/v1/gifs/search?q=" + input.replace(" ", "+") + "&api_key=dc6zaTOxFJmzC";
		ajaxRequest(url);
	}
	
});

// 2. Do the data stuff with the API

// AJAX Request
function ajaxRequest(url){
	var GiphyAJAXCall = new XMLHttpRequest();
	alert(url);
	GiphyAJAXCall.open("GET", url);
	GiphyAJAXCall.send();
	console.log(GiphyAJAXCall);
	GiphyAJAXCall.addEventListener('load', function(e){
		var data = e.target.response;
		//console.log(data);
		pushToDOM(data);
	})	
}


// 3. Show me the GIFs

function pushToDOM(input){

	var response = JSON.parse(input);

	var imageUrls = response.data;
	var jsContainer = document.querySelector(".js-container");

	// Clean up the innerHTML, so the new gifs will replace the old ones, instead of just appending them
	jsContainer.innerHTML = "";
	
	// Go through the images and print them on the page
	imageUrls.forEach(function(image){
		var src = image.images.fixed_height.url;
		//console.log(image);
		jsContainer.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
	})

}