// Create the application namespace
const amiiboApp = {};

// Create a function that gets Amiibo characters and info from Amiibo API from game series endpoint
amiiboApp.getAmiibo = function(query) {
    // Make an ajax call to retrieve results from the API
    $.ajax({
        url: 'https://www.amiiboapi.com/api/amiibo/?gameseries',
        method: 'GET',
        dataType: 'JSON',
        data: {
            q: query
        }
    })
}

// Create a function that displays information based on user input
amiiboApp.displayAmiibo = function (amiibo) {
    for( let i = 1; i <= 6; i++) {
        // Break object into separate pieces
            // Image
            // Character name
            // Date released in North America
        const image = $('<img>').attr({ 'src': amiibo[i].image, 'alt': amiibo[i].name })
        const name = $('<h3>').text(amiibo[i].name);
        const dateReleased = $('<p>').text(amiibo[i].release.na);
        const amiiboInfo = $('<div>').append(image, name, dateReleased);

        $('#amiibo-gallery').append(amiiboInfo);
    }
}


// Dynamically display elements to the DOM

// Create a function that will update title to the given game series

// Initialize the application
$(function() {
    amiiboApp.init()
});

// Create an event listener to listen on change for radio buttons and grab the value

