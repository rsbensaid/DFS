// var model1 = require('./../models/br1-model');
// var model2 = require('./../models/br2-model');
// var model3 = require('./../models/today-model');
var mongoose = require('mongoose');
// var dk1 = mongoose.model('DK1');
// var br1 = mongoose.model('BR1');
// var br2 = mongoose.model('BR2');
var splitsdb = mongoose.model('split')
var everythingdb = mongoose.model('EVERYTHING');
var Crawler = require('crawler');
var url = require('url');

exports.show = function(req, res){
	var send_me = []
	everythingdb.find({}, function (err, results){
		if(err)
		{
			console.log(err)
		}
		console.log(results);
		res.send(results);
	})
}

exports.add = function(req, res){
	var everything = [];
	var player_mins = [];
	var dk_players = [];
	var team_paces = [];
	var players = [];
	var c = new Crawler({
	maxConnections: 10,
	callback: function (error, result, $) {
		console.log('level1');
		var list = JSON.parse(result.body).playerList;
		for (x in list)
		{
			var home_away = null;
			var opp_team = null;
			var p_team = null;
			if(list[x].tid == list[x].htid)
			{
				home_away = 'Home'
			}
			else
			{
				home_away = 'Away'
			}
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

			dk_player = {
				name: list[x].fn + " " + list[x].ln,
				team: p_team,
				price: list[x].s,
				h_a: home_away, 
				opp: opp_team,
				pos: list[x].pn,
				opp_rk: list[x].or,
				fppg: list[x].ppg
				}
			// var players_t = new dk1(player)
			// console.log(players_t)
			// players_t.save(function(err){
			// 	if(err){
			// 		console.log(err)
			// 	}
			// })
			
			dk_players.push(dk_player)	
		}
		everything.push(dk_players)
		var mins_table = []
		var c1 = new Crawler({
			maxConnections: 10,
			callback: function (error, result, $) 
			{
				console.log('level2');
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
					// var mins_t = new br2(player);
					// mins_t.save(function(err){
					// 	if(err){
					// 		console.log(err)
					// 	}
					// })
					player_mins.push(player)
				}
				everything.push(player_mins)

				var pace_table = []
				var c2 = new Crawler({
					maxConnections: 10,
					callback: function (error, result, $) 
					{
						console.log('level3');
						var names = [];
						var paces = [];
						$('#misc tr').each(function (index, team)
						{
							var team_stats = []
							$($(team).html()).each(function (index, td)
							{
								if($(td).html() !== null)
								team_stats.push($(td).html())
							})
							paces.push(team_stats[10])
							names.push(team_stats[1])

						})
						var teams = []
						for (x in names)
						{
							var y = names[x].substring(names[x].indexOf(">")+1, names[x].lastIndexOf("<"));
							teams.push(y)
						}
						for (z in teams)
						{
							team = {team_name: teams[z], pace: paces[z]}
							// var pace_t = new br1(team);
							// pace_t.save(function(err){
							// 	if(err){
							// 		console.log(err)
							// 	}
							// 	else {
							// 		console.log('great success!')
							// 	}
							// })
							team_paces.push(team)
						}
						team_paces.sort(function(a,b){
							if(a.team_name < b.team_name) {return -1} 
							if(a.team_name > b.team_name) {return 1}
								return 0
						})

						everything.push(team_paces)

						for (x in everything[0])
						{
							var t_pace = null;
							if(everything[0][x].team == 'Atl'){t_pace = everything[2][3].pace};
							if(everything[0][x].team == 'Bos'){t_pace = everything[2][4].pace};
							if(everything[0][x].team == 'Bkn'){t_pace = everything[2][5].pace};
							if(everything[0][x].team == 'Cha'){t_pace = everything[2][6].pace};
							if(everything[0][x].team == 'Chi'){t_pace = everything[2][7].pace};
							if(everything[0][x].team == 'Cle'){t_pace = everything[2][8].pace};
							if(everything[0][x].team == 'Dal'){t_pace = everything[2][9].pace};
							if(everything[0][x].team == 'Den'){t_pace = everything[2][10].pace};
							if(everything[0][x].team == 'Det'){t_pace = everything[2][11].pace};
							if(everything[0][x].team == 'GSW'){t_pace = everything[2][12].pace};
							if(everything[0][x].team == 'Hou'){t_pace = everything[2][13].pace};
							if(everything[0][x].team == 'Ind'){t_pace = everything[2][14].pace};
							if(everything[0][x].team == 'LAC'){t_pace = everything[2][15].pace};
							if(everything[0][x].team == 'LAL'){t_pace = everything[2][16].pace};
							if(everything[0][x].team == 'Mem'){t_pace = everything[2][17].pace};
							if(everything[0][x].team == 'Mia'){t_pace = everything[2][18].pace};
							if(everything[0][x].team == 'Mil'){t_pace = everything[2][19].pace};
							if(everything[0][x].team == 'Min'){t_pace = everything[2][20].pace};
							if(everything[0][x].team == 'NOP'){t_pace = everything[2][21].pace};
							if(everything[0][x].team == 'NY'){t_pace = everything[2][22].pace};
							if(everything[0][x].team == 'OKC'){t_pace = everything[2][23].pace};
							if(everything[0][x].team == 'Orl'){t_pace = everything[2][24].pace};
							if(everything[0][x].team == 'Phi'){t_pace = everything[2][25].pace};
							if(everything[0][x].team == 'Pho'){t_pace = everything[2][26].pace};
							if(everything[0][x].team == 'Por'){t_pace = everything[2][27].pace};
							if(everything[0][x].team == 'Sac'){t_pace = everything[2][28].pace};
							if(everything[0][x].team == 'SA'){t_pace = everything[2][29].pace};
							if(everything[0][x].team == 'TOR'){t_pace = everything[2][30].pace};
							if(everything[0][x].team == 'Uta'){t_pace = everything[2][31].pace};
							if(everything[0][x].team == 'Was'){t_pace = everything[2][32].pace};

							var opp_pace = null;
							if(everything[0][x].opp == 'Atl'){opp_pace = everything[2][3].pace};
							if(everything[0][x].opp == 'Bos'){opp_pace = everything[2][4].pace};
							if(everything[0][x].opp == 'Bkn'){opp_pace = everything[2][5].pace};
							if(everything[0][x].opp == 'Cha'){opp_pace = everything[2][6].pace};
							if(everything[0][x].opp == 'Chi'){opp_pace = everything[2][7].pace};
							if(everything[0][x].opp == 'Cle'){opp_pace = everything[2][8].pace};
							if(everything[0][x].opp == 'Dal'){opp_pace = everything[2][9].pace};
							if(everything[0][x].opp == 'Den'){opp_pace = everything[2][10].pace};
							if(everything[0][x].opp == 'Det'){opp_pace = everything[2][11].pace};
							if(everything[0][x].opp == 'GSW'){opp_pace = everything[2][12].pace};
							if(everything[0][x].opp == 'Hou'){opp_pace = everything[2][13].pace};
							if(everything[0][x].opp == 'Ind'){opp_pace = everything[2][14].pace};
							if(everything[0][x].opp == 'LAC'){opp_pace = everything[2][15].pace};
							if(everything[0][x].opp == 'LAL'){opp_pace = everything[2][16].pace};
							if(everything[0][x].opp == 'Mem'){opp_pace = everything[2][17].pace};
							if(everything[0][x].opp == 'Mia'){opp_pace = everything[2][18].pace};
							if(everything[0][x].opp == 'Mil'){opp_pace = everything[2][19].pace};
							if(everything[0][x].opp == 'Min'){opp_pace = everything[2][20].pace};
							if(everything[0][x].opp == 'NOP'){opp_pace = everything[2][21].pace};
							if(everything[0][x].opp == 'NY'){opp_pace = everything[2][22].pace};
							if(everything[0][x].opp == 'OKC'){opp_pace = everything[2][23].pace};
							if(everything[0][x].opp == 'Orl'){opp_pace = everything[2][24].pace};
							if(everything[0][x].opp == 'Phi'){opp_pace = everything[2][25].pace};
							if(everything[0][x].opp == 'Pho'){opp_pace = everything[2][26].pace};
							if(everything[0][x].opp == 'Por'){opp_pace = everything[2][27].pace};
							if(everything[0][x].opp == 'Sac'){opp_pace = everything[2][28].pace};
							if(everything[0][x].opp == 'SA'){opp_pace = everything[2][29].pace};
							if(everything[0][x].opp == 'TOR'){opp_pace = everything[2][30].pace};
							if(everything[0][x].opp == 'Uta'){opp_pace = everything[2][31].pace};
							if(everything[0][x].opp == 'Was'){opp_pace = everything[2][32].pace};

							var mins_pg = null;
							var g = null;
							for (m in everything[1])
							{
								if(everything[0][x].name == everything[1][m].player)
									{
										mins_pg = everything[1][m].mpg.toFixed(2);
										g = everything[1][m].games;
									}
							}
							// console.log('mpg', mins_pg, 'games', g);

								player = {
								name: (everything[0][x].name),
								pos: (everything[0][x].pos),
								price: (everything[0][x].price),
								team: (everything[0][x].team),
								team_pace: t_pace,
								h_a: (everything[0][x].h_a),
								opp: (everything[0][x].opp),
								opp_rk: (everything[0][x].opp_rk),
								opp_pace: opp_pace,
								fppg: (everything[0][x].fppg),
								mpg: mins_pg,
								games: g
							}

							var new_player = new everythingdb(player);
							new_player.save(function (err)
							{
								if(err)
								{
									console.log(err)
								}
							})

						}
						
							// }
					}
				})
				c2.queue('http://www.basketball-reference.com/leagues/NBA_2015.html');
			}
		})
		c1.queue('http://www.basketball-reference.com/leagues/NBA_2015_totals.html');	
		// console.log('ERRTHANG', everything);
	

// exports.add_splits = function(req, res){
								var c3 = new Crawler({
								maxConnections: 10,
								callback: function (error, result, $) 
								{
									console.log('level4');
									$('#page_content div ul li a .bold_text').each(function (index, name)
									{
										var p_name = $(name).html()

										var groups = []
										$('#stats tbody').each(function (index, group)
										{
											var splits = []
											$($(group).html()).each(function (index, split)
											{
											 	var stats = []			
												$($(split).html()).each(function (index, stat)
												{
													if ($(stat).html() != null && $(stat).html() != '' && $(stat).html() != [] && $(stat).html() != undefined)
													{
														// console.log('--')
														// console.log($(stat).html())
														stats.push($(stat).html())
													}
												})
												if(stats != [] && stats != '' && stats !== null)
													{
														// console.log(stats);
														splits.push(stats)
													}
											})
											if (splits != [] && splits != ''){groups.push(splits)}
										})
										// console.log(groups)
										var split_titles = []
										for (x in groups)
										{
											split_titles.push(groups[x][0][0]);
											groups[x][0].splice(0,1)
										}
										// console.log(split_titles)
										// console.log(groups)
										for (t in split_titles)
										{
											for (s in groups[t])
											{
												player_splits = {
												player_name: p_name,
												split_title: split_titles[t],
												split: groups[t][s][0],
												games: groups[t][s][1],
												minutes: groups[t][s][3],
												rebs: groups[t][s][11],
												assists: groups[t][s][12],
												steals: groups[t][s][13],
												blocks: groups[t][s][14],
												turnovers: groups[t][s][15],
												points: groups[t][s][17],
												three_pt_fgm: groups[t][s][6]
												}
												var new_split = new splitsdb(player_splits);
												new_split.save(function (err)
												{
													if(err)
													{
														console.log(err)
													}
												})
											}
										}
									})
								}	
								});
								// c3.queue("http://www.basketball-reference.com/players/a/anticpe01/splits/2015/");
								console.log('DK_players', dk_players);
								for (i in dk_players){
									console.log(dk_players[i].name);
									var space = dk_players[i].name.indexOf(' ');
									var first_init_l_name = (dk_players[i].name[space+1].toLowerCase());
									var first_five_l_name = (dk_players[i].name.substring(space+1,space+6).toLowerCase())
									var first_two_f_name = (dk_players[i].name.substring(0,2).toLowerCase())

								c3.queue("http://www.basketball-reference.com/players/"+first_init_l_name+"/"+first_five_l_name+first_two_f_name+"01/splits/2015/");
								}

	} //maybe put final crawl here (inside that curly)
})
c.queue('https://www.draftkings.com/lineup/getavailableplayers?draftGroupId=4835');
// console.log('ERRTHANG', everything);
}

