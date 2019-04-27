require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
///i think i have to use a .slice or .join here? not working on tests
var subject = process.argv[3];

var request = require('./keys');
var fs = require('fs');

// switch (command) {
//     case 'concert-this':
//         bandsInTown();
//         break;
//     case 'spotify-this-song':
//         spotify(subject);
//         break;
//     case 'movie-this':
//         movie(subject);
//         break;
//     case 'do-what-it-says':
//         Random();
//         break;
// }
UserInputs(command, subject);

function UserInputs (command, subject){
    switch (command) {
    case 'concert-this':
        bandsInTown(subject);
        break;
    case 'spotify-this-song':
        getSpotify(subject);
        break;
    case 'movie-this':
        showMovieInfo(subject);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

function bandsInTown(subject) {
    var request = require("request");

    request("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            console.log("----------------------");
            // console.log(concerts);
            for (i = 0; i < 1; i++) {
                console.log("!! EVENT INFO !!")
                console.log("Lineup: ", concerts[0].lineup);
                console.log("Venue Name: ", concerts[0].venue.name);
                console.log("Location: ", concerts[0].venue.city , ", ", concerts[0].venue.region);
            }
        }
    })
}

function getSpotify() {
    
     
    spotify.search({ type: 'track', query: subject }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data.tracks.items[0]); 
    });
}

// var runUser = function(argOne, argTwo) {
//     pick(argOne, argTwo);
// }

// runUser(command, subject);