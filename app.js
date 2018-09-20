 var topics = ["The Witcher", "Far Cry 3", "NBA 2k", "Nioh", "Dark Souls", "The Legends of Zelda", "Super Smash Bros", "Sonic", "God of War", "Tomb Raider"]

 $("button").on("click", function() {

	var game = $(this).attr("data-person");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		game + "&api_key=tsdXdzWZlQm97pYyPEQCObEsmZREqBG6";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

		.then(function(response) {
	
			var results = response.data;
console.log(results)
			for (var i = 0; i < results.length; i++) {

				if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				
					var gifDiv = $("<div class='item'>");
					
					var rating = results[i].rating;

					var p = $("<p>").text("Rating: " + rating);

					var personImage = $("<img class='gif'>");

					personImage.attr("data-state", "animate");
					personImage.attr("data-animate", results[i].images.fixed_height.url);
					personImage.attr("data-still", results[i].images.fixed_height_still.url);
				
              personImage.attr("src", results[i].images.fixed_height.url);

              gifDiv.append(p);
							gifDiv.append(personImage);

							$("#gifs-appear-here").prepend(gifDiv);
				}
			}
		});
});

$(document).on("click", ".gif", function() {
	console.log(this)
	var state = $(this).attr("data-state");
 console.log(state)
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

$.ajax({
	url: queryURL,
	method: "GET"
}).then(function(response) {

	var  gameDiv = $("<div class='game'>");

	var rating = response.Rated;

	var pOne = $("<p>").text("Rating: " + rating);

	gameDiv.append(pOne);

	$("#gifs-appear-here").prepend(gameDiv);
});

function renderButtons() {

$("#buttons-view").empty();

for (var i = 0; i < movies.length; i++) {

	var a = $("<button>");
	
	a.addClass("game-btn");

	a.attr("data-name", game[i]);

	a.text(game[i]);

	$("#buttons-view").append(a);
}
}

$("#add-game").on("click", function(event) {
event.preventDefault();

var game = $("#game-input").val().trim();

games.push(game);

renderButtons();
});

$(document).on("click", ".game-btn", displayGameInfo);

renderButtons();

