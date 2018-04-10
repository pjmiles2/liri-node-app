
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv;
var command = input[2];
var inputArray = [];

for (var j=3; j < input.length; j++){

   inputArray.push(input[j]);
   var title = inputArray.join("+");

}



console.log(title);

if (command === "my-tweets") {
    myTweets();
};

if (command === "spotify-this-song") {
    spotifyThisSong(title);
};



function myTweets(){

var params = {PatrickMiles: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i = 0; i < tweets.length; i ++) {
    console.log(tweets[i].text);
  }
}
});

};

function spotifyThisSong (title) {

    spotify
      .search({ type: 'track', query: "'" + title + "'" })
      .then(function(response) {
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Preview Link on Spotify: " + response.tracks.items[3].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);      
    })
      .catch(function(err) {
        console.log(err);
      });
}