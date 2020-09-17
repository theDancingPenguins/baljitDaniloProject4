// Create the application namespace
const amiiboApp = {};

// Create a function that gets Amiibo characters and info from Amiibo API from game series endpoint
amiiboApp.getAmiibo = function(query) {
    // Make an ajax call to retrieve results from the API
    $.ajax({
        url: `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${query}`,
        method: 'GET',
        dataType: 'JSON',

    }).then((res) => {
        console.log(res);
        $('#amiigoGallery').empty();
        amiiboApp.displayAmiibo(res.amiibo);
    })
}

// Create a function that displays information based on user input
amiiboApp.displayAmiibo = function (amiibo) {
    amiibo.forEach(amiibo => {
        // Break object into separate pieces
            // Image
            // Character name
            // Date released in North America
        const image = $('<img>').attr({ 'src': amiibo.image, 'alt': amiibo.name })
        const name = $('<h3>').text(amiibo.name);
        const dateReleased = $('<p>').text(amiibo.release.na);
        const amiiboInfo = $('<div>').append(image, name, dateReleased);
        
        // Dynamically display elements to the DOM
        $('#amiibo-gallery').append(amiiboInfo);
    });
}



// Create a function that will update title to the given game series
amiiboApp.updateAmiiboSeries = function(amiiboTitle) {
    $('h2 span').text(amiiboTitle);
}

amiiboApp.init = function() {
    // Create an event listener to listen on change for radio buttons and grab the value
    $('#amiiboForm').on('click', function() {
        const amiiboSeries = $('input[name=amiibo-series]:checked').val(); //$(this).val();
        const amiiboTitle = $(this).find(':selected').text();

        amiiboApp.getAmiibo(amiiboSeries);
        amiiboApp.updateAmiiboSeries(amiiboTitle);
    })

}

// Initialize the application
$(function() {
    amiiboApp.init()
});


