var express = require('express');
var app = express();

app.use(express.static('public'));

var songs = require('./routes/songs');
app.use('/songs', songs);

var songs1 = require('./routes/songs1');
app.use('/songs1', songs1);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Listening on port '+ port);
});









