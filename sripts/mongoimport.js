// mongoimport.js
var mongoose = require('mongoose')
	, env = process.env.NODE_ENV || 'development'
  	, config = require('./config/config')[env];
  	
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var anyjson = require('./any');

var Any = mongoose.model(
	'Any', 
	mongoose.Schema({
		"prop1": "PropType"
	})
);

Any.find({},function(err,dbplayers){

	for(var i=0; i<dbplayers.length; i++) {
		dbplayers[i].remove();
	}

	for(var i=0; i<anyjson.length; i++) {
		var any = new Any({
			"prop1": anyjson[i].prop1
		})

		any.save(function(err,dbplayer){
			if (err)
			console.log("Error on any save!");
		})
	}
	
	console.log("Any import finished! Press Ctrl+C to exit.");
})