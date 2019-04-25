require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
// var spotify = new Spotify({
//     id: b71fcbca292549488c4142338e7cfd7e,
//     secret: acb4a851a5d649a7ad98aebb872658a6
//   });

var command = process.argv[2];
var subject = process.argv[3];

var request = require('.keys');
var fs = require('fs');

switch (command) {
    case 'concert-this':
        bandsInTown();
        break;
   
}

function bandsInTown() {
    if (subject == null) {
        subject = "Butch Walker";
    }
    request("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=47972149c9ef95f0470de3a7f2d73af9", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("----------------------");
            console.log("yo what it do");
        }
    })
}


 

 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });