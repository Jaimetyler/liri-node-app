require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();
var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");


var request = require('./keys');
var fs = require('fs');


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
            for (i = 0; i < concerts.length; i++) {
                console.log("!! EVENT INFO !!")
                console.log(i);
                // fs.appendFile("log.txt", "!! EVENT INFO !!/n")
                console.log("Lineup: ", concerts[i].lineup);
                // fs.appendFileSync("log.txt", "Lineup: ", concerts[i].lineup, "/n");
                console.log("Venue Name: ", concerts[i].venue.name);
                // fs.appendFileSync("log.txt", "Venue Name: ", concerts[i].venue.name, "/n");
                console.log("Location: ", concerts[i].venue.city , ", ", concerts[i].venue.region);
                // fs.appendFileSync("log.txt", "Location: ", concerts[i].venue.city , ", ", concerts[i].venue.region, "/n");
                console.log(moment(concerts[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
                // fs.appendFileSync("log.txt", moment(concerts[i].datetime).format('MMMM Do YYYY, h:mm:ss a'),"/n");
                console.log("----------------------");
                // fs.appendFileSync("log.txt", "----------------------/n")

            }
        }
    })
}

function getSpotify() {
    
     
    spotify.search({ type: 'track', query: subject }, function(err, data) {
      if (err) {
           console.log('Error occurred: ' + err);
           return;
      }
      var songs = data.tracks.items;
    
    for (var i = 0; i < songs.length; i++) {
        console.log("!! SONG INFO !!")
        fs.appendFileSync("log.txt", "!! SONG INFO !!\n");
        console.log(i);
        fs.appendFileSync("log.txt", i +"\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
        console.log("Album: " + songs[i].album.name);
        fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
        console.log("Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
        console.log("----------------------"); 
        console.log("----------------------");
     }
    });
}

