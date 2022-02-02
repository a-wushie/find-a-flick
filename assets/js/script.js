// variables 

var getMovieInfo = function(movie) {

    // OMDB var
    var apiUrl = "http://www.omdbapi.com/?apikey=4ba5eec&t=" + movie;

    fetch(apiUrl)
    .then(function(response) {
        return response;
    })
    .then(function(data) {
        
    })
}