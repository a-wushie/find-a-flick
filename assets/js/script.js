// variables 

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

var streamingAvailability = function (movie) {

    // pull out imdbID for API fetch request
    var imdb_id = movie.imdbID;
    // title for error message
    var title = movie.title;
 
    // assemble the endpoint URL
    var apiUrl = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=" + imdb_id + "&output_language=en";

    // call with the required header as a second argument
    fetch(apiUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": "FILLER"
        }
    }).then(function (response) {

        if (response.ok) {
            return response.json();
        } else {
            // pass error message if nothing returned by API
            var msg = "We were not able to find streaming availability for " + title + ". Thank you for using find-a-flick!";
            displayStreamingLinks(msg);
        }
        return response.json();
    }).then(function(data) {
        // pass the data object if it was returned
        displayStreamingLinks(data);
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

};

var displayStreamingLinks = function(data) {

    var title = data.title;
    var msg = "";
    var streaming[] = data.streamingInfo;

    // if no streaming info is returned then set msg to to say as much, otherwise success
    if (streaming[0] == null) {
        msg = "We were not able to find streaming availability for " + title + ". Thank you for using find-a-flick!";
    } else {
        msg = "Thank you for using find-a-flick! Your selection of " + title + " is available to stream at:"
    }

    // container for the links
    var linkContainer = document.createElement("div");

    // populate the h2 header and append to container
    var msgEl = document.createElement("h2")
    msgEl.textContent = (successMsg);
    linkContainer.appendChild(msgEl);

    var linkBar = document.createElement("nav");

    // for loop to populate and append the link buttons

};