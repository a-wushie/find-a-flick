// variables 
var searchButtonEl = document.getElementsByClassName("btn");
var api = "38c2d6859bmsh6250293f6ae6019p10b60ejsnb83f50f7665d";

const modal = document.querySelector("#modal-info");
var modalError = document.querySelector("#modal-error");
var errorMessage = document.querySelector("#error-msg");

// counter for number for saved searches
var numSavedSearches = 0;

var checkDups = function (title) {
    // define an object of titles 
    for (var i = 0; i < localStorage.length; i++) {
        // pull each item from local storage and compare to user entered value
        var cmp = JSON.parse(localStorage.getItem(i));

        // if match is found return TRUE.  User entered string is NOT a unqiue value
        if (cmp === title) {
            return true;
        };
    };
};



var getMovieInfo = function (movie) {

    // OMDB var
    var apiUrl = "https://www.omdbapi.com/?apikey=4ba5eec&t=" + movie;

    // get data through a fetch request
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Check to see if the response comes back as true or false
            if (data.Response === 'False') {
                errorMessage.textContent = ("That title was not found. Please enter a valid title.")
                modalError.classList.add('is-active');
            } else {
                if (!checkDups(data.Title)) {
                    // if user entered value is unique save the search
                    saveSearch(data.Title);
                };

                displayMovieInfo(data);
                streamingAvailability(data);
                modal.classList.add('is-active')
            }
        })
        .catch(function (error) {
            console.log(error)
        });


};

var streamingAvailability = function (movie) {

    // var api = JSON.parse(localStorage.getItem("key"));


    // pull out imdbID for API fetch request
    var imdb_id = movie.imdbID;
    // pull title for error message
    var title = movie.Title;

    // assemble the endpoint URL
    var apiUrl = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=" + imdb_id + "&output_language=en";

    // call with the required header as a second argument
    fetch(apiUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": api
        }
    }).then(function (response) {

        if (response.ok) {
            return response.json();
        } else {

            
            // create error message if 404 error / no object returned.
            var msg = "We were not able to find streaming availability for " + title + ". Thank you for using find-a-flick!";

            var noStreamEl = document.createElement("div");
            var msgEl = document.createElement("h2");
            msgEl.textContent = (msg);

            noStreamEl.appendChild(msgEl);

            document.body.appendChild(noStreamEl)
            return;
        }
    }).then(function (data) {
        console.log(data);
        // pass the data object if it was returned
        displayStreamingLinks(data);
    });

};

var displayMovieInfo = function (data) {
    // Create a title element
    var filmTitle = document.querySelector('#movieTitle')
    // set text to title value from omdb
    filmTitle.textContent = (data.Title)

    // Create an img element 
    var poster = document.querySelector('#movieImg')
    // set source of img as link for poster from omdb
    console.log(data.Poster)
    poster.setAttribute("src", data.Poster)

    // Create text for Year
    var year = document.querySelector('#movieYear')
    // set text of the year to value form omdb
    year.textContent = ("Released: " + data.Year)

    // Create text for Rated
    var rated = document.querySelector('#movieRated')
    // set text to rated value from omdb
    rated.textContent = ("Rated: " + data.Rated)

    // Create text for Runtime
    var runtime = document.querySelector('#movieRuntime')
    // set text to runtime from omdb
    runtime.textContent = ("Runtime: " + data.Runtime)


    // Create text for Plot
    var plot = document.querySelector('#moviePlot')
    // set text for plot from omdb
    plot.textContent = (data.Plot)

};

var displayStreamingLinks = function (data) {

    document.getElementById("linkList").innerHTML = "";

    // title variable case sensitive and title is not captialized in the streaming-availability object
    var title = data.title;
    // empty string for success/failure msg
    var msg = "";

    // Use object.keys to create an array of the names of the streaming options available 
    var options = Object.keys(data.streamingInfo);

    console.log(options);
    if (options[0] == null) {
        // if options array is empty, then teh object was returned and no streaming services were found
        // so create a failure message and display it to the user
        msg = "We were not able to find streaming availability for " + title + ". Thank you for using find-a-flick!";

        // populate the h2 header and append to container
        var msgEl = document.createElement("h2")
        msgEl.textContent = (msg);


        document.getElementById("linkList").appendChild(msgEl);

    } else {
        // if options array is not empty, then streaming services were returned
        // create success message
        msg = "Thank you for using find-a-flick! Your selection of " + title + " is available to stream at:"

        // then loop through the array of options to access the link for each
        // ex data.streamingInfo[key = netflix].us.link;
        // with each iteration also save the text name of the option.
        for (var i = 0; i < options.length; i++) {
            var key = options[i];
            var link = data.streamingInfo[key].us.link;

            var newTab = "_blank";

            // save the streaming option as a string
            var tempString = options[i];

            // then use charAt() to split off the first character into its own string and capitalize it with toUpperCase
            // then concatenate that with everything after the first character in tempString
            // to receive the service name capitalized.
            var serviceName = tempString.charAt(0).toUpperCase() + tempString.slice(1);

            // create list item and link el
            var optEl = document.createElement("li");
            var linkEl = document.createElement("a");

            // set link to linkS href to go to the streaming service and correct name
            linkEl.setAttribute("href", link);
            // set target to _blank so link opens a new tab
            linkEl.setAttribute("target", newTab);
            linkEl.textContent = (serviceName);
            optEl.appendChild(linkEl);

            document.getElementById("linkList").appendChild(optEl);
        };

    }
};

var saveSearch = function (title) {
    console.log(numSavedSearches);
    // only want to save the last five searches
    if (numSavedSearches === 5) {
        numSavedSearches = 0;
    }

    key = numSavedSearches;
    numSavedSearches++;
    var value = title;
    // save user entered title and key to local storage
    localStorage.setItem(key, JSON.stringify(value));
    displaySavedSearches();

};

var displaySavedSearches = function () {
    var pastSearches = [];
    var keys = [];

    document.getElementById("recent-search").innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {

        // pull key value of local storage object
        var key = parseInt(localStorage.key(i));
        // key values in range 1 to 5
        if (key >= 0 && key < 5) {
            keys[i] = key;
            var searchText = JSON.parse(localStorage.getItem(key));
            pastSearches[i] = searchText;
        };
    };

    for (var i = 0; i < pastSearches.length; i++) {
        var pastSearch = document.createElement("a");
        pastSearch.setAttribute("id", keys[i]);
        pastSearch.setAttribute("class", "navbar-item nav-search");
        pastSearch.textContent = (pastSearches[i]);
        // append the elment to nav dropdown
        document.getElementById("recent-search").prepend(pastSearch);
    }
};

var setState = function () {

    var pastSearches = [];
    var keys = [];

    for (var i = 0; i < localStorage.length; i++) {

        // pull key value of local storage object
        var key = parseInt(localStorage.key(i));
        // key values in range 1 to 5
        if (key >= 0 && key < 5) {
            keys[i] = key;
            var searchText = JSON.parse(localStorage.getItem(key));
            pastSearches[i] = searchText;
        };

    };
    numSavedSearches = pastSearches.length;
    displaySavedSearches();

};

$(".navbar-item").click(function (event) {

    const modal = document.querySelector(".modal")

    // Prevent page from reloading
    event.preventDefault();

    // grab id of event target to pull linked movie title
    var key = event.target.id;

    // pull user entered key from local storage
    // var api = JSON.parse(localStorage.getItem(key));

    // pull title from local storage. 
    var movieTitle = JSON.parse(localStorage.getItem(key));

    getMovieInfo(movieTitle)

    modal.classList.add('is-active')

});

