var chat = require('./../server/controllers/ChatCtrl.js');

module.exports = function(app, io){
	app.get('/', function(req, res){res.render('index.ejs',{});})
	app.post('/add_user', chat.add);
	app.post('/log_user', chat.login);
	app.post('/add10k', chat.add10k);
	app.post('/randos', chat.randos);
}