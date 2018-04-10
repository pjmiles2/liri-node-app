
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv;
var command = input[2];
var inputArray = [];

for (var j=3; j < input.length; j++){

   inputArray.push(input[j]);
   var title = inputArray.join(" ");

}

choices(command, title);

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
    
      var output = data.split(",");
      choices(output[0], output[1]);
    }
    );    
  };

function choices(command, title) {
switch(command) {
    case "my-tweets":
        myTweets();
    break;

    case "spotify-this-song":
    if (title != null) {
        spotifyThisSong("'" + title + "'");
        } else {spotifyThisSong("the+sign+ace+of+base")};
    break;
    
    case "movie-this":
    if (title != null) {
        movieThis(title);
    } else {movieThis("Mr.+Nobody")};
    break;

    case "do-what-it-says":
        doWhatItSays();
    break;
    };
};


function myTweets(){

var params = {PatrickMiles: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i = 0; i < 20; i ++) {
    console.log("\uD83D\uDC23 " + tweets[i].text);
  }
}
});

};

function spotifyThisSong (title) {

    spotify
      .search({ type: 'track', query: title})
      .then(function(response) {
        console.log("-----------------------------------------------------------------------------")
        console.log("\u266B Artist: " + response.tracks.items[0].artists[0].name);
        console.log("\u266B Song Name: " + response.tracks.items[0].name);
        console.log("\u266B Preview Link on Spotify: " + response.tracks.items[3].preview_url);
        console.log("\u266B Album Name: " + response.tracks.items[0].album.name);      
        console.log("-----------------------------------------------------------------------------")

    })
      .catch(function(err) {
        console.log(err);
      });
}

function movieThis(title) {

    request('http://www.omdbapi.com/?t="'+title+'"&y=&plot=short&apikey=trilogy', function(error, response, body) {

        if (!error && response.statusCode === 200) {
          console.log("-----------------------------------------------------------------------------")            
          console.log("\uD83C\uDFAC Title: " + JSON.parse(body).Title);
          console.log("\uD83C\uDFAC Year: " + JSON.parse(body).Year);
          console.log("\uD83C\uDFAC IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("\uD83C\uDFAC Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("\uD83C\uDFAC Country: " + JSON.parse(body).Country);
          console.log("\uD83C\uDFAC Language: " + JSON.parse(body).Language);
          console.log("\uD83C\uDFAC Plot: " + JSON.parse(body).Plot);
          console.log("\uD83C\uDFAC Cast: " + JSON.parse(body).Actors);
          console.log("-----------------------------------------------------------------------------")

        }
      });
    };
