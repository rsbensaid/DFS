var today = require('./../server/controllers/TodayCtrl.js');

module.exports = function(app){
	app.get('/add_today', today.add);
	app.get('/today_json', today.show);
	app.get('/player_splits/:player', today.showSplits);
	// app.get('/today_json', today.show_br2);	
}