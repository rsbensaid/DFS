var mongoose = require('mongoose');

var splitSchema = new mongoose.Schema(
{
	player_name: String,
	split_title: String,
	split: String,
	games: Number,
	minutes: Number, 
	rebs: Number, 
	assists: Number,
	steals: Number,
	blocks: Number, 
	turnovers: Number, 
	points: Number,
	three_pt_fgm: Number
})

mongoose.model('split', splitSchema)