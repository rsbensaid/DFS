var model1 = require('./../models/br1-model');
var model2 = require('./../models/br2-model');
var model3 = require('./../models/today-model');
var mongoose = require('mongoose');
var dk1 = mongoose.model('DK1');
var br1 = mongoose.model('BR1');
var br2 = mongoose.model('BR2');
var Crawler = require('crawler');
var url = require('url');

exports.show = function(req, res){
	var send_me = []
	dk1.find({}, function (err, results){
		if(err)
		{
			console.log(err)
		}
		send_me.push(results);
		br1.find({}, function (err1, results1){
			// console.log('results1', results1);
		if(err)
		{
			console.log(err1)
		}
		send_me.push(results1)
			br2.find({}, function (err2, results2){
			if(err)
			{
				console.log(err2)
			}
			send_me.push(results2);
			res.send(send_me);
			})
		})
	})
}

exports.add = function(req, res){
	var players = []
	var c = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) {
		var list = JSON.parse(result.body).playerList;
		// console.log(JSON.parse(result.body));
		// for("pid" in )

		for (x in list)
		{
			// console.log(list[x]);
			var home_away = null;
			var opp_team = null;
			var p_team = null;
			// check to see if player is home or away
			if(list[x].tid == list[x].htid)
			{
				home_away = 'Home'
			}
			else
			{
				home_away = 'Away'
			}
			// check to see if player is home or away
			if(list[x].tid == list[x].htid)
			{
				opp_team = list[x].atabbr
				p_team = list[x].htabbr
			}
			else
			{
				opp_team = list[x].htabbr
				p_team = list[x].atabbr
			}

			player = {
				name: list[x].fn + " " + list[x].ln,
				team: p_team,
				price: list[x].s,
				h_a: home_away, 
				opp: opp_team,
				pos: list[x].pn,
				opp_rk: list[x].or,
				fppg: list[x].ppg
				}
			// console.log(player)
			var players_t = new dk1(player)
			console.log(players_t)
			players_t.save(function(err){
				if(err){
					console.log(err)
				}
			})
			// players.push(player);
		}
		// return players;
		// console.log(players)
	}
})

c.queue('https://www.draftkings.com/lineup/getavailableplayers?draftGroupId=4779');

var mins_table = []
var c1 = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) 
	{
		var players = []
		var players2 = []
		var minutes = []
		var games = []

		$('.full_table td a').each(function (index, player)
		{		
			players.push($(player).html());
		})
		
		for (x in players)
			{
				if (x % 2 == 0)
				{
					players2.push(players[x])
				} 
			}

		$('.full_table').each(function (index, player)
		{
			var player_stats = []
			$($(player).html()).each(function (index, stat)
			{
				if($(stat).html() !== null)
				{
					player_stats.push($(stat).html());
				}
			})
			games.push(player_stats[5]);
			minutes.push(player_stats[7]);
		})

		for (i in players2)
		{
			player = {player: players2[i], games: games[i], minutes: minutes[i], mpg: minutes[i] / games[i]}
			var mins_t = new br2(player);
			mins_t.save(function(err){
				if(err){
					console.log(err)
				}
			})
		}
	}

})

c1.queue('http://www.basketball-reference.com/leagues/NBA_2015_totals.html');


var pace_table = []
var c2 = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) 
	{
		var names = [];
		var paces = [];
		// runs through each TR of the table with id = 'misc'
		$('#misc tr').each(function (index, team)
		{
			var team_stats = []

			// runs through each TD of each row
			$($(team).html()).each(function (index, td)
			{
				if($(td).html() !== null)
				team_stats.push($(td).html())
			})
			// the below two lines add the two relevant pieces of information to arrays
			paces.push(team_stats[10])
			names.push(team_stats[1])

		})
		//here I separate the team's name from the entire A tag it comes with
		var teams = []
		for (x in names)
		{
			var y = names[x].substring(names[x].indexOf(">")+1, names[x].lastIndexOf("<"));
			teams.push(y)
		}
		// console.log('Teams', teams)
		// console.log('Paces', paces);

		for (z in teams)
		{
			team = {name: teams[z], pace: paces[z]}
			// console.log(team)
			// console.log(team)
			var pace_t = new br1(team);
			pace_t.save(function(err){
				if(err){
					console.log(err)
				}
				else {
					console.log('great success!')
				}
			})
		}
		// here is the final table to be stored in the database
		// return pace_table
		// console.log(pace_table);
	}
});

c2.queue('http://www.basketball-reference.com/leagues/NBA_2015.html');


}

