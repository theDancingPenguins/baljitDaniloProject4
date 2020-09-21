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
        $('#amiiboGallery').empty();
        amiiboApp.displayAmiibo(res.amiibo);
    })
}

// Create a function that displays information based on user input
amiiboApp.displayAmiibo = function (amiibo) {
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    let shuffled = shuffle(amiibo);
    let selected = shuffled.slice(0, 6);
    
    selected.forEach(amiibo => {
        // return N/A when date released is not provided
        let dateReleased = $('<p>').text(`Release Date: ${amiibo.release.na}`);
        if (!amiibo.release.na) {
            dateReleased = $('<p>').text(`Release Date: N/A`);
        };
    
        const image = $('<img>').attr({ 'src': amiibo.image, 'alt': amiibo.name });
        const name = $('<h3>').text(amiibo.name);
        const amiiboInfo = $('<div>').addClass('amiiboContainer').append(image, name, dateReleased);

        $('#amiiboGallery').append(amiiboInfo);
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


