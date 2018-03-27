// S4PyxwvZJ4hFioQHRihr5SxhxTEvXhbG

//// variables
var topics = ["the dark knight", "inception", "tropic thunder", "avengers", "pulp fiction", "john rambo","tomb raider","goodfellas","jarhead","the prestige"];


//// Events

//gif button action
$(document).on("click", ".rendered-button", function () {

    $("#gif-add").empty();

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var movieDiv = $("<div>");

            var p = $("<p>");

            p.text("Rating : " + results[i].rating);

            var movieImage = $("<img src=\"\" data-still=\"\" data-animate=\"\" data-state=\"still\" class=\"current-gif\">");

            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[i].images.fixed_height.url);
           

            movieDiv.append(movieImage);
            movieDiv.append(p);

            $("#gif-add").prepend(movieDiv);


        }

    });
});

// manipulate gif states
$(document).on("click", ".current-gif", function () {

    var state = $(this).attr("data-state");

    if (state == "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else if (state == "animate"){
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
      }

   
});


// add new buttons
$(document).on("click","#submit-btn", function(event) {
    event.preventDefault();


    var movie = $("#movie-input").val();

    topics.push(movie);

    console.log(topics);

    renderButtons();
  });

///// Functions
function renderButtons() {


    $("#btn-add").empty();

    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i = 0; i < topics.length; i++) {
        var button = $("<button type=\"button\" class=\"btn btn-primary btn-sm rendered-button\" data-name=\"\" data-toggle=\"button\">").text(topics[i]);
        button.attr("data-name", topics[i]);
        $("#btn-add").append(button);
    }

    $("#movie-input").trigger("reset");

}

renderButtons();

