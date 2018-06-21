require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
//sets the variable to make it easier to access the keys ie. client.options.consumer_secret
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var spacing = "___________________________________________________________________________________";
var colors = require('colors');
var inquirer = require('inquirer');

inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do? \n",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says", new inquirer.Separator()],
        name: "Commands",
        suffix: "Choose one of the Following Commands to see your tweets, look for a song, a movie, or randomly do a command."
      },
]).then(function(inquirerResponse) {
    console.log(spacing);
    var action = inquirerResponse.Commands;
    if(inquirerResponse.Commands === "my-tweets"){
        var item = "N/A";
        work(action, item);
    }
else if(inquirerResponse.Commands === "do-what-it-says"){
var item = "N/A";
work(action, item);

}else{
        inquirer.prompt([
        {
            type: "input",
            message: "What do you want to look for?",
            name: "searchTerm",
            default: ""
        }
        ]).then(function(inquirerResult) {
        
            console.log(spacing);
var item = inquirerResult.searchTerm;
work(action, item);
        })
    }
});

function work(action, item){
switch(action){
   
    case "my-tweets": 
    
    tweetList();
    logInput(action, item);

    break;
    
    case "spotify-this-song": 
    
    if(item === ""){
         var item = "The Sign Ace of Base";
        music(item);
        logInput(action, item);
     } else{
        music(item);
        logInput(action, item);
     }
    break;
    
    case "movie-this":
    
    if(item === ""){
        var item = "Mr. Nobody";
       movies(item);
       logInput(action, item);
    } else{
       movies(item);
       logInput(action, item);
    }
    break;
    
    case "do-what-it-says": 
    random();
    logInput(action, item);
    break;
    
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
   
   var result = JSON.stringify(newTweets);
   console.log(newTweets);
   console.log(spacing);
   log(result);
    }
});
}

function music(item){

spotify
  .search({ type: 'track', query: item , limit: '1' })
  .then(function(response) {
   if(response.tracks.items[0] === undefined){
       console.log(colors.red("no results found!"));
       var result = "no results found!";
       log(result);
       console.log(spacing);
   } else {
    var song ={
     artist: response.tracks.items[0].artists[0].name,
     title: response.tracks.items[0].name,
     preview: response.tracks.items[0].preview_url,
     album: response.tracks.items[0].album.name
    };
    console.log(song);
    console.log(spacing);
    var result = JSON.stringify(song);
    log(result);
   } })
  .catch(function(err) {
    console.log(err);
  });
}

function movies(item){
    

var movieName = item.replace(/\s/g, '+');

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

   
        if (!error && response.statusCode === 200) {
          
          if(JSON.parse(body).Ratings[1]=== undefined){
              var tomato = "N/A";
          } else {
              var tomato = JSON.parse(body).Ratings[1].Value;
          }
          var newMovie = {
              title: JSON.parse(body).Title,
              year: JSON.parse(body).Year,
              imdb_rating: JSON.parse(body).imdbRating,
              rotten_tomatoes: tomato,
              country: JSON.parse(body).Country,
              language: JSON.parse(body).Language,
              plot: JSON.parse(body).Plot,
              actors: JSON.parse(body).Actors
          }
          console.log(newMovie);
          console.log(spacing);
          var result = JSON.stringify(newMovie);
          log(result);
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
      
      
    });

}

//function to append result to file
 function log(result) {
    console.log(result.length);
    var divider = "-";
    var logDivider = divider.repeat(result.length);

    fs.appendFile("log.txt", result + "\r\n" + logDivider + "\r\n", function(err) {
        if (err) {
            return console.log(err);
          } 
        })
 }