// require mongoose from node modules
var mongoose = require('mongoose');
//require FS so we can load up and read all of the model files that we create
var fs = require('fs');

var connect = function() {
	//specify options for when mongoose connects to mongodb
	var options = { server: { socketOptions: { keepAlive: 1}}}
	// connect to our mongodb database server with options specified above
	console.log('where mah DB');
	mongoose.connect('mongodb://localhost/dfs', options)
}
// actually connect to the DB
connect();

mongoose.connection.on('error', function(err){
	console.log(err)
})

//if we get disconnected from mongoose, try to connect again

mongoose.connection.on('disconnected', function(){connect()
})

//specify path to all of the models
var models_path = __dirname + '/../server/models'
//read all of the files in that path and for each one if the file is .js lets require it
fs.readdirSync(models_path).forEach(function(file){
	if(~file.indexOf('.js') !== -1) {
		require(models_path + '/' + file);
	}
})