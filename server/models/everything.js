var mongoose = require('mongoose');

var everythingSchema = new mongoose.Schema({
	name: String, 
	pos: String,
	price: Number, 
	team: String,
	team_pace: Number,
	h_a: String,
	opp: String,
	opp_rk: Number,
	opp_pace: Number,
	fppg: Number,
	mpg: Number,
	games: Number
})

mongoose.model('EVERYTHING', everythingSchema);