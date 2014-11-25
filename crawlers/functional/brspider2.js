var Crawler = require('crawler');
var url = require('url');

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
			// console.log($(player).html());
			// console.log(players);
		})
		
		for (x in players)
			{
				if (x % 2 == 0)
				{
					players2.push(players[x])
				} 
			}

		// console.log('playa', players2)
		// console.log('playa', players)

		


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


		// console.log('mins', minutes);
		// console.log('games', games);


		var mins_table = []
		for (i in players2)
		{
			player = {name: players2[i], games: games[i], minutes: minutes[i], mpg: minutes[i] / games[i]}
			mins_table.push(player)
		}
		// return mins_table;
		console.log(mins_table);
	}

})

c1.queue('http://www.basketball-reference.com/leagues/NBA_2015_totals.html');