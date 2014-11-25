var mongoose = require('mongoose');

var DK1Schema = new mongoose.Schema({
	name: String,
	pos: String, 
	price: Number,
	team: String,
	h_a: String,
	opp: String,
	opp_rk: Number,
	fppg: Number,
})

mongoose.model('DK1', DK1Schema)