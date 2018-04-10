
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv;
var command = input[2];
var inputArray = [];

for (var j=3; j < input.length; j++){

   inputArray.push(input[j]);
   var title = inputArray.join("+");

}

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
    if (title != null){
        movieThis("'" + title + "'");
        } else {movieThis("Mr.+Nobody")};
    break;

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
      .search({ type: 'track', query: title})
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

function movieThis(title) {

    request("http://www.omdbapi.com/?t="+title+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
      
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Cast: " + JSON.parse(body).Actors);

        }
      });
      
};