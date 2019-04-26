require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var subject = process.argv[3];

var request = require('.keys');
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
    if (subject == null) {
        subject = "Butch Walker";
    }
    request("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("----------------------");
            console.log("yo what it do");
        }
    })
}