# liri-node-app

This assignment is made using Node.js utilizing the command line to run and make requests to different api's depending on what is entered into the command line.

API's used: Twitter Api, Spotify Api, and OMDBapi.

There is a total of 4 command options available.
* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

To use these commands you must enter them into the command line exactly.

In addition to typing these commands, the `spotify-this-song` and `movie-this` commands allow for an additional argument to be entered. 
That additional argument will be what is searched for in the API's and to correctly use the arguments in the case of more than one word in your argument, the argument must be inside quotation marks.

The `my-tweets` command does not require an additional argument and when ran will return the users last 20 tweets.
The `do-what-it-says` command will run one of the other commands depending on what is inside random.txt(new commands must be entered in a specific format. Example: spotify-this-song,"I Want it That Way").

All the commands, arguments, and results, that are accepted, will be appended to log.txt to see what was done.



