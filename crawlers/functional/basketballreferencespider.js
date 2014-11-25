var Crawler = require('crawler');
var url = require('url');

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

		var pace_table = []
		for (z in teams)
		{
			team = {name: teams[z], pace: paces[z]}
			pace_table.push(team)
		}
		// here is the final table to be stored in the database
		return pace_table
		// console.log(pace_table);
	}
});

c2.queue('http://www.basketball-reference.com/leagues/NBA_2015.html');