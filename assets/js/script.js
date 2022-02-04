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
        streamingAvailability(data);
    });
};