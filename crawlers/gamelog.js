var Crawler = require('crawler');
var url = require('url');

var c3 = new Crawler
({
	maxConnections: 10,
	callback: function (error, result, $) 
	{
		var games = []
		console.log('runs');
		// console.log('level4');
		$('#pgl_basic tr').each(function (index, game)
		{
			var stats = []
			var pts = []
			var rebs = []
			var stls = []
			var asts = []
			var tovs = []
			var three = []
			var blks = []
			var blks = []
			$($(game).html()).each(function (index, stat)
			{
			// 	// console.log('new stat', $(stat).html())
				// if($(stat).html())
				// {
					stats.push($(stat).html())
				// }
			// 	// stats.push($(stat).html())
			// 	games.push(stats)
				// console.log('STATS', stats)
			})
			var game = {}
			game.date = $(stats[5]).html();
			game.opp = $(stats[13]).html();
			game.pts = stats[55];
			game.tovs = stats[51];
			game.blks = stats[49];
			game.stls = stats[47];
			game.asts = stats[45];
			game.rebs = stats[43];
			game.threes = stats[27];
			// console.log('STATS', stats)
			if(game.date !== null)
			{
			games.push(game);
			}
			// console.log('stats', games)
			// console.log('here', $(game).html())
		})
		console.log('GAMES', games)
	}
})

c3.queue("http://www.basketball-reference.com/players/a/anthoca01/gamelog/2015/")