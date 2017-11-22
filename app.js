var express = require('express');
var app = express();

app.use(express.static('public'));

var songs = require('./routes/songs');
app.use('/songs', songs);
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Listening on port '+ port);
});



//var songs = {'Doris Day':'Sentimental Journey', 'Monkees': 'Daydream Believer', ' Carl Gustav Boberg': 'How Great Thou Art'};


/*app.get('/songs1/:name', function(request, response){
	var name = request.params.name;
	client.hget('songs', name, function(error, reply){
		response.render('show.ejs',
			{ song: {name: name, songInd: reply}});
	//console.log(reply);
	//response.json(reply);	
	}); 
		//response.json(songs[request.params.name]);
});
*/





