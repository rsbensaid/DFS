var Crawler = require('crawler');
var url = require('url');

var c = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) {
		console.log($);
		// console.log($(result).html());

		$('#misc tr').each(function (index, row){
			// console.log('ROW', $(row).html());
			var teams = []
			var x = $(row).html();
			// console.log('x', x)
			$(x).each(function (index, td)
			{
				var team_stats = []
				
				if($(td).html() != null || $(td).html() != '')
				{
					// console.log('TD', $(td).html());
					team_stats.push($(td).html())
					// console.log('TS',team_stats)
				}
				teams.push(team_stats);
			})
			// console.log('Pace', teams[21]);
			// console.log('', teams[21]);
				

			// $('row').html().each(function (index, td){
			// 	console.log('index 4', td[4])
			// })


			// console.log('BODY', table.tbody);
			// console.log('CHILDREN', table.children[0].next.children[1]);
			// console.log('CHILDREN', table.children[0].data);
			// console.log('INDEX', index);
			// console.log('children', index.children);
		// 	var toQueueUrl = $(table).attr('tr');
		// 	// c.queue(toQueueUrl);
		// 	// console.log(toQueueUrl);
		// 	console.log(table)
		});
		// console.log(result);
	}
})

c.queue('http://www.basketball-reference.com/leagues/NBA_2015.html');