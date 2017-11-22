var express = require('express');
var app = express();

//app.use(express.static('public'));

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var redis = require('redis');

if (process.env.REDISTOGO_URL) {
    // TODO: redistogo connection
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);

	client.auth(rtg.auth.split(":")[1]);
} else {
   var client = redis.createClient(); 
}

var router1 = express.Router();


	router1.route('/')
	.get('/:name', function(request, response){
	var name = request.params.name;
	client.hget('songs', name, function(error, reply){
		response.render('show.ejs',
			{ song: {name: name, songInd: reply}});
	//console.log(reply);
	//response.json(reply);	
	}); 
		//response.json(songs[request.params.name]);
});





module.export = router1;