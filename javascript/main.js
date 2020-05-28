// 1. Search

var UI = {};

UI.enterPress = function(){
	var inputSearch = document.querySelector('.input-search');
	inputSearch.addEventListener('keyup', function(e){
		if (e.which === 13){
			//SoundCloudAPI.init();
			SoundCloudAPI.getTrack(inputSearch.value);
		}
	})
}

UI.submitClick = function(){
	var submit = document.querySelector('.js-submit');
	submit.addEventListener('click', function(){
		//SoundCloudAPI.init();
		SoundCloudAPI.getTrack(document.querySelector('.input-search').value);
	})
}

UI.resetButton = function(){
	var reset = document.querySelector('.clear-button');
	reset.addEventListener('click', function(){
		localStorage.clear();
		sideBar.innerHTML = "";
	})
}

// 2. Query Soundcloud API

var SoundCloudAPI = {};

SoundCloudAPI.init = function(){
	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

SoundCloudAPI.getTrack = function(inputValue){

	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  var searchResults = document.querySelector(".js-search-results");
	  searchResults.innerHTML = "";
	  SoundCloudAPI.renderTracks(tracks);
	});	
}

// 3. Display the cards
SoundCloudAPI.renderTracks = function(tracks){

	tracks.forEach(function(track){
		// make card	
		console.log(track);

		var card = document.createElement("div");
		card.classList.add('card');

		// make image of card
		var imgDiv = document.createElement("div");
		imgDiv.classList.add("image");
		var img = document.createElement("img");
		img.src = track.artwork_url || "https://picsum.photos/200";
		img.classList.add('image_img');
		imgDiv.appendChild(img);

		// make content
		var content = document.createElement('div');
		content.classList.add("content")
		
		// make content header
		var contentHeader = document.createElement("div");
		contentHeader.classList.add("header");
		var a = document.createElement("a");
		a.href = track.permalink_url;
		a.target = "_blank";
		a.innerHTML = track.title;
		contentHeader.appendChild(a);
		content.appendChild(contentHeader);

		// Make button
		var button = document.createElement("div");
		button.classList.add("ui", "bottom", "attached", "button", "js-button");
		var plus = document.createElement("i");
		plus.classList.add("add", 'icon');
		var span = document.createElement("span");
		span.innerHTML = "Add to playlist";
		button.appendChild(plus);
		button.appendChild(span);

		button.addEventListener('click', function(){
			SoundCloudAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imgDiv);
		card.appendChild(content);
		card.appendChild(button);

		// get the search results card
		var searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);
	})	

}

// 4. Add to playlist and play

SoundCloudAPI.getEmbed = function(url){
	SC.oEmbed(url, {
	  auto_play: true
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);

	  var sideBar = document.querySelector('.js-playlist');

	  var box = document.createElement('div');
	  box.innerHTML = embed.html;

	  sideBar.insertBefore(box, sideBar.firstChild);
	  localStorage.setItem("key", sideBar.innerHTML);
	});
}

var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
SoundCloudAPI.init();
UI.enterPress();
UI.submitClick();
UI.resetButton();