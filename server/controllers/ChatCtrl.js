//var pg = require('pg');
//var conString = 'postgres://postgres:spencer13@localhost/chatusers';
var url = require('url');

var Chance = require('chance');

var mysql = require('mysql');

var pool = mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   'root',
      database          :   'chatroom',
      debug             :   false
});

exports.add = function(req, res){
	console.log('WRECK BODY', req.body);
	var insert_query = "INSERT INTO `users` (`username`, `password`, `avatar`, `color`, `admin`, `blocked`, `created_at`, `updated_at`) VALUES('"+req.body.name+"', '"+req.body.pw+"' , '"+req.body.avatar+"', '"+req.body.color+"', 0, 0, NOW(), NOW())";
	pool.getConnection(function(err, connection){
		// console.log('connect', connection);
		if(err)
		{
			console.log('error');
			connection.release();
			return;
		}
		connection.query(insert_query, function(err, rows){
			connection.release();
			if(!err){
				console.log('Functioning');
				res.json('added');
			}
			else{
				console.log(err);
			}
		});
	});
}

exports.login = function(req, res){
	console.log('req.body', req.body);
	var select_query = "SELECT * FROM `users` WHERE username = '"+req.body.name+"' AND password = '"+req.body.pw+"'";
	pool.getConnection(function(err, connection){
		if(err)
		{
			console.log('Error:', err);
			connection.release();
			return
		}
		connection.query(select_query, function(err, rows){
			connection.release();
			if(!err){
				console.log('ROWS', rows)
				res.json(rows[0].username);
			}
		})
	})	
}

exports.add10k = function(req, res){
	for(var i=0; i < 10001; i++){
		// INSERT INTO DB
		console.log(i);
	}
}

exports.randos = function(req, res){
	console.log('getting randos');
	var words = [];
	for(i=0; i < 20000; i++){
		var censor = new Chance()
		var word = censor.word();
		console.log('word', word)
		words[i] = word;
	}
	console.log('werds', words);	
	for(x in words){	
		var insert_query = "INSERT INTO `c_words` (`word`) VALUES ('"+words[x]+"')";
		pool.getConnection(function(err, connection){
			if(err)
			{
				console.log('Error', err);
				connection.release();
				return;
			}
			connection.query(insert_query, function(err, rows){
				connection.release();
				if(!err){
					// console.log('Functioning');
					// res.json('added');
				}
				else{
					console.log(err);
				}
			});
		})
	}
}
