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
        $('#amiibo-gallery').empty();
        amiiboApp.displayAmiibo(res.amiibo);
    })
}

// Create a function that displays information based on user input
amiiboApp.displayAmiibo = function (amiibo) {
    const shuffle = amiibo.sort(() => 0.5 - Math.random());
    let selected = shuffle.slice(0, 6);

    selected.forEach(amiibo => {

    
        const image = $('<img>').attr({ 'src': amiibo.image, 'alt': amiibo.name });
        const name = $('<h3>').text(amiibo.name);
        const dateReleased = $('<p>').text(amiibo.release.na);
        const amiiboInfo = $('<div>').addClass('amiibo-container').append(image, name, dateReleased);

        $('#amiibo-gallery').append(amiiboInfo);
    })
}



// Create a function that will update title to the given game series
amiiboApp.updateAmiiboSeries = function(amiiboTitle) {
    $('h2 span').text(amiiboTitle);
}

amiiboApp.init = function() {
    // Create an event listener to listen on change for radio buttons and grab the value
    $('#amiiboForm input').on('click', function(e) {
        e.preventDefault();
        const amiiboSeries = $(this).val(); //$(this).val();
        const amiiboTitle = $(this).val();

        amiiboApp.getAmiibo(amiiboSeries);
        amiiboApp.updateAmiiboSeries(amiiboTitle);
    })

}

// Initialize the application
$(function() {
    amiiboApp.init()
});


