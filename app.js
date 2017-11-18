var express = require('express');
var app = express();

app.use(express.static('public'));

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
client.flushdb();
client.hset('songs', 'Doris Day', 'Sentimental Journey');
client.hset('songs', 'Monkees', 'DayDream Believer');
client.hset('songs', ' Carl Gustav Boberg', 'How Great Thou Art');

app.get('/', function(request, response){
	response.send('OK');
});


//var songs = {'Doris Day':'Sentimental Journey', 'Monkees': 'Daydream Believer', ' Carl Gustav Boberg': 'How Great Thou Art'};
app.get('/songs', function(request, response){
		client.hkeys('songs', function(error, names){
		if(error) throw error;
		response.json(names);	
		});
		//response.json(Object.keys(songs));
});

app.get('/songs1/:name', function(request, response){
	var name = request.params.name;
	client.hget('songs', name, function(error, reply){
		response.render('show.ejs',
			{ song: {name: name, songInd: reply}});
	//console.log(reply);
	//response.json(reply);	
	}); 
		//response.json(songs[request.params.name]);
});



app.post('/songs', parseUrlencoded, function(request, response){
	var data = request.body;
	if(!data.name || !data.song){
		response.sendStatus(400);
		return false;
	}
	client.hset('songs', data.name, data.song);
	var song3 = data.name;
	response.json(song3);	

	//songs[data.name] = data.song;
	//response.status(200).json(data.name);	
});

app.get('/songs/:name', function(request, response){
	var name = request.params.name;
	client.hget('songs', 'name', function(error, obj){
	response.json(obj);	
	});
	
});

app.delete('/songs/:name', function(request, response){
	var name = request.params.name;
	client.hdel('songs', name, function(error) {
      if(error) throw error;
      response.json(name);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Listening on port '+ port);
});
