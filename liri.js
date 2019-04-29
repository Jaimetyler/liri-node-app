require("dotenv").config();

//creating variables to take in node command line arguments
var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");

//accessing key.js file
var keys = require("./keys.js");
//accessing spotify api
var Spotify = require('node-spotify-api');
//accessing spotify keys
var spotify = new Spotify(keys.spotify);
//accessing moment module
var moment = require('moment');

//accessing omdb
var omdb = require('omdb');

var request = require('./keys');
var fs = require('fs');
//accessing axios module
var axios = require("axios");

//running user commands rules
UserInputs(command, subject);

//specifying user commands
function UserInputs(command, subject) {
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
                console.log(i);
                console.log("!! EVENT INFO !!")
                // fs.appendFile("log.txt", "!! EVENT INFO !!/n")
                console.log("Lineup: ", concerts[i].lineup);
                // fs.appendFileSync("log.txt", "Lineup: ", concerts[i].lineup, "/n");
                console.log("Venue Name: ", concerts[i].venue.name);
                // fs.appendFileSync("log.txt", "Venue Name: ", concerts[i].venue.name, "/n");
                console.log("Location: ", concerts[i].venue.city, " ", concerts[i].venue.region);
                // fs.appendFileSync("log.txt", "Location: ", concerts[i].venue.city , ", ", concerts[i].venue.region, "/n");
                console.log(moment(concerts[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
                // fs.appendFileSync("log.txt", moment(concerts[i].datetime).format('MMMM Do YYYY, h:mm:ss a'),"/n");
                console.log("----------------------");
                // fs.appendFileSync("log.txt", "----------------------/n")

            }
        }
    })
}

function getSpotify(subject) {

    spotify.search({ type: 'track', query: subject }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("!! SONG INFO !!")
            fs.appendFileSync("log.txt", "!! SONG INFO !!\n");
            console.log("Song name: " + songs[i].name);
            fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
            console.log("Preview song: " + songs[i].preview_url);
            fs.appendFileSync("log.txt", "preview song: " + songs[0].preview_url + "\n");
            console.log("Album: " + songs[i].album.name);
            fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
            console.log("Artist(s): " + songs[i].artists[0].name);
            fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
            console.log("----------------------");
            fs.appendFileSync("log.txt", "----------------------");
        }
    });
}

function showMovieInfo(subject) {

    var movie = subject;
    if (!movie) {
        subject = "The Silence of the Lambs";
        console.log("----------------------");
        console.log("If you haven't watched The Silence of the Lambs, you should: https://www.imdb.com/title/tt0102926/");
        console.log("It's on Netflix!")
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(url).then(
        function (response) {

            console.log("----------------------")
            console.log("Movie Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("----------------------")
        })
}

function showSomeInfo() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(",");
  
      for (let i = 0; i < dataArr.length; i++) {
        if (i % 2 === 0) {
          console.log(dataArr[i] + " " + dataArr[i + 1]);
        }
      }
    
    })}