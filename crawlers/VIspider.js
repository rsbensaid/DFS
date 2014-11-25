var Crawler = require('crawler');
var url = require('url');

var c = new Crawler({
	maxConnections: 10,
	jQuery: true,
	callback: function (error, result, $) {
		// var page = $(result).html()
		// console.log('result', result.body);
		// console.log($);
		// console.log(result);
		// $('.viCellBg1 cellTextNorm cellBorderL1').each(function (index, row)
		// {
		// 	console.log($(row).html())
		// })
		// $('tr').each(function (index, game)
		// {
			
		// })

		$('.pointspread tr').each(function (index, matchup)
			{
				console.log('NEWWW GAME')
				var away_team = null;
				var home_team = null;
				$('.team a').each(function (index, team)
					{
					if(index % 2 == 0)
						{
							away_team = $(team).html()
						}
					else
						{
							home_team = $(team).html()
						}
					})
				console.log('home', home_team)
				console.log('away', away_team)
				

		
				// console.log('new', $(team).html(), index)
			})
	}
})

c.queue('http://sports.yahoo.com/nba/odds/pointspread;_ylt=AuXncr3any_Q9aSB.ftK8XQnWaB4?day=2014-11-18&pg=1');