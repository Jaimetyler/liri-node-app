require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
///i think i have to use a .slice or .join here? not working on tests
var subject = process.argv[3];

var request = require('./keys');
var fs = require('fs');

switch (command) {
    case 'concert-this':
        bandsInTown();
        break;
    case 'spotify-this-song':
        spotify(subject);
        break;
    case 'movie-this':
        movie(subject);
        break;
    case 'do-what-it-says':
        Random();
        break;
}

function bandsInTown() {
    var request = require("request");
    
    request("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body)
            console.log("----------------------");
            console.log(concerts);
        for (i = 0; i < 1; i++) {
            console.log("!! EVENT INFO !!")
            console.log("Venue Name: ", concerts[0].venue.name);
        }
    }
    })
}