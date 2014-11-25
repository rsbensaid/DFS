//require express so we can build an express app
var express = require('express');
//require http so we can use http request and response
var http = require('http');
// require path so we can use path stuff like path.join
var path = require('path');

var Crawler = require('crawler');

var url = require('url');
//create the express app
//express is a set of tools that allows us to more easily deal with 
//HTTP actions and some other stuff involving setting and getting variables
var app = express();

// so we can parse post data through the req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// allows us to use put, patch, and delete with HTTP verbs
var methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));

// sets up a static file server that points to the client directory
app.use(express.static(path.join(__dirname, 'client')));

var mongoose = require('./config/mongoose.js')
var routes = require('./config/routes.js')(app);

// sets the port
app.set('port', 1230);
// port starts listenign
app.listen(app.get('port'), function(){
	console.log('Nachos are happening on: '+ app.get('port'));
})
