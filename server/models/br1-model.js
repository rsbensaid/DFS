var mongoose = require('mongoose');

var BR1Schema = new mongoose.Schema({
	name: String,
	pace: Number
})

mongoose.model('BR1', BR1Schema)