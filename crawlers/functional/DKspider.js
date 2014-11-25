var Crawler = require('crawler');
var url = require('url');

var c = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) {
		var list = JSON.parse(result.body).playerList;
		console.log(JSON.parse(result.body));
		// for("pid" in )
		var players = []
		for (x in list)
		{
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
				ppg: list[x].ppg
				}
			players.push(player);
		}
		return players;
		// console.log(players)
	}
})

c.queue('https://www.draftkings.com/lineup/getavailableplayers?draftGroupId=4814');