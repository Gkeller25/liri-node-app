require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
//sets the variable to make it easier to access the keys ie. client.options.consumer_secret
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var item = process.argv[3];

work(action, item);



function work(action, item){

switch(action){
//This will show your last 20 tweets and when they were created at in your terminal/bash window.    
case "my-tweets": 
if(item === undefined){
    var item = "N/A";
    tweetList();
    logInput(action, item);
} else {
    tweetList();
    logInput(action, item)};
break;
//will search the song input into the command line but will only search what is inside parenthesis
case "spotify-this-song": 
if(item === undefined){
     var item = "The Sign Ace of Base";
    music(item);
    logInput(action, item);
 } else{
    music(item);
    logInput(action, item);
 }
break;
//
case "movie-this":
if(item === undefined){
    var item = "Mr. Nobody";
   movies(item);
   logInput(action, item);
} else{
   movies(item);
   console.log(item);
   logInput(action, item);
}
break;
//
case "do-what-it-says": 
if(item === undefined){
    var item = "N/A";
    random();
    logInput(action, item);
} else {
    random();
    logInput(action, item)};
break;

default: console.log("Not a Valid option!");
}
}

//how should it look inside the Console?
function tweetList(){
    
   var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2";

  client.get('statuses/user_timeline', queryUrl, function(error, tweets, response) {
   for(var i = 0; i < tweets.length; i++){
    var newTweets = {
        date: tweets[i].created_at,
        text: tweets[i].text
      };
   console.log(JSON.stringify(newTweets));
   var result = JSON.stringify(newTweets);
   log(result);
    }
});
}

function music(item){

spotify
  .search({ type: 'track', query: item , limit: '1' })
  .then(function(response) {
   
    var song ={
     artist: response.tracks.items[0].artists[0].name,
     title: response.tracks.items[0].name,
     preview: response.tracks.items[0].preview_url,
     album: response.tracks.items[0].album.name
    };
    console.log(song);
    var result = JSON.stringify(song);
    log(result);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movies(item){
    

var movieName = item.replace(/\s/g, '+');

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
request(queryUrl, function(error, response, body) {

   
        if (!error && response.statusCode === 200) {
          
          var newMovie = {
              title: JSON.parse(body).Title,
              year: JSON.parse(body).Year,
              //wouldn't it be better to have a combined rating section that shows all the different ratings they have received?
              imdb_rating: JSON.parse(body).imdbRating,
              rotten_tomatoes: JSON.parse(body).Ratings[1].Value,
              country: JSON.parse(body).Country,
              language: JSON.parse(body).Language,
              plot: JSON.parse(body).Plot,
              actors: JSON.parse(body).Actors
          }
          console.log(newMovie);
          console.log(JSON.stringify(newMovie));
          var result = JSON.stringify(newMovie);
          log(result);
          //if(item === undefined){
              //console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>")
         // }
        }
      });
}

function random(){
     
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (error) {
          return console.log(error);
        }
          
        console.log(data);
        
        var dataArr = data.split(",");
        console.log(dataArr);
        var newAction = dataArr.shift();
        var newItem = dataArr.pop();
        work(newAction, newItem);

        
        
        
    });
}

function logInput(action, item){
    
    fs.appendFile("log.txt", action + ", " + item + "\r\n", function(err) { 
        if (err) {
        return console.log(err);
      } 
      console.log(action + ":" + item);
      
    });
    //
}

//function to append result to file
 function log(result) {
    fs.appendFile("log.txt", result + "\r\n", function(err) {
        if (err) {
            return console.log(err);
          } 
        })
 }