// Create the application namespace.
const amiiboApp = {};

// This function retrieves Amiibo characters (as objects in an array) and the relevant information of each from the Amiibo API, from the game series endpoint.
amiiboApp.getAmiibo = function(query) {
    // Make an ajax call to retrieve results from the API
    $.ajax({
        url: `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${query}`,
        method: 'GET',
        dataType: 'JSON',

    }).then((res) => {
        $('#amiiboGallery').empty();
        amiiboApp.displayAmiibo(res.amiibo);
    })
}

// This function displays the amiibos that are retrieved by the Ajax call, and displays them on the webpage based on user input.
amiiboApp.displayAmiibo = function (amiibo) {
    // This function shuffles the array of retrieved Amiibo's and randomizes their index values, so that each click produces different results.
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
    
    // This loop runs through the randomized Amiibo array and then retrieves the relevant information of each, storing it in variables.
    selected.forEach(amiibo => {
        // This will return N/A if the release date information for North America is unavailable.
        let dateReleased = $('<p>').text(`Release Date: ${amiibo.release.na}`);
        if (!amiibo.release.na) {
            dateReleased = $('<p>').text(`Release Date: N/A`);
        };
        // This is where the Amiibo image is stored.
        const image = $('<img>').attr({ 'src': amiibo.image, 'alt': amiibo.name });
        // This is where the name of each Amiibo is stored.
        const name = $('<h3>').text(amiibo.name);
        // This is where the complete information is stored (date released, image, name), where the individual pieces are put together in a Div.
        const amiiboInfo = $('<div>').addClass('amiiboContainer').append(image, name, dateReleased);

        // This is what appends the divs of each Amiibo's information to the HTML.
        $('#amiiboGallery').append(amiiboInfo);
    })
}

// This function will update the title on the page based on the Amiibo series, using user input to print the correct title.
amiiboApp.updateAmiiboSeries = function(amiiboTitle) {
    $('h2 span').text(amiiboTitle);
}

amiiboApp.init = function() {
    // This event listener takes the users click, and performs the relevant functions ( getting amiibo's with the API call, and updating the gallery title on the screen. )
    $('#amiiboForm input').on('click', function(e) {
        e.preventDefault();
        const amiiboSeries = $(this).val(); //$(this).val();
        const amiiboTitle = $(this).val();

        amiiboApp.getAmiibo(amiiboSeries);
        amiiboApp.updateAmiiboSeries(amiiboTitle);
    })
}

// Initialize the application.
$(function() {
    amiiboApp.init()
});


