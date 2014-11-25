var mongoose = require('mongoose')

var BR2Schema = new mongoose.Schema({
	player: String,
	games: Number,
	minutes: Number,
	mpg: Number
})

mongoose.model('BR2', BR2Schema)