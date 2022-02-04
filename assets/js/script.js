// variables 
var searchButtonEl = document.getElementsByClassName("btn")

var getMovieInfo = function(movie) {

    // OMDB var
    var apiUrl = "http://www.omdbapi.com/?apikey=4ba5eec&t=" + movie;

    // get data through a fetch request
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayMovieInfo(data);
        streamingAvailability(data);
    });
};

var displayMovieInfo = function(data) {
    
    // Create a container to hold information from OMDB and display it
    // Might be unnecessary IF it is hard coded in html 
    var MOVIECONTAINER = document.createElement("div")

    // Create a title element
    var filmTitle = document.createElement("h2")
    // set text to title value from omdb
    filmTitle.textContent = (data.Title)
    // Append to the page
    MOVIECONTAINER.appendChild(filmTitle)

    // Create an img element 
    var poster = document.createElement("img")
    // set source of img as link for poster from omdb
    poster.setAttribute("src", data.Poster)
    // Append to the page
    MOVIECONTAINER.appendChild(poster)

    // Create text for Year
    var year = document.createElement('p')
    // set text of the year to value form omdb
    year.textContent = ("Released: " + data.Year)
    // Append to the page
    MOVIECONTAINER.appendChild(year)

    // Create text for Rated
    var rated = document.createElement('p')
    // set text to rated value from omdb
    rated.textContent = ("Rated: " + data.Rated)
    // Append to the page
    MOVIECONTAINER.appendChild(rated)

    // Create text for Runtime
    var runtime = document.createElement("p")
    // set text to runtime from omdb
    runtime.textContent = ("Runtime: " + data.Runtime)
    // Append to the page
    MOVIECONTAINER.appendChild(runtime)

    // Create text for Plot
    var plot = document.createElement("p")
    // set text for plot from omdb
    plot.textContent = (data.Plot)
    // Append to the page
    MOVIECONTAINER.appendChild(plot)

    document.body.appendChild(MOVIECONTAINER)

}

$("#btn").click(function(event) {
    // Prevent page from reloading
    event.preventDefault();

    // Set sibling form text value to variable
    var movieTitle = $(this).siblings(".form").text();

    // send variable "Movie title" into fetch request
    getMovieInfo(movieTitle);
)}
