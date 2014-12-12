dfs.factory('Factory', function($http){
	var factory = {}

	factory.getToday = function(callback){
		console.log('factory get')
		$http.get('today_json').success(function (output){
			today = output;
			console.log('2')
			callback(today)
		})
	}

	factory.getSplits = function(player, callback){
		console.log('factory show_player', player);
		var new_url = player.split(' ').join('+');
		$http.get('player_splits/'+new_url).success(function (output){
			var splits_collect = []
			for (var x = 1; x < output.length; x++){
				var split = {
					fppg: (((output[x].points)+(output[x].blocks*2)+(output[x].steals*2)+(output[x].assists*1.5)
						+(output[x].rebs*1.25)+(output[x].three_pt_fgm)-(output[x].turnovers*.5))/output[x].games).toFixed(2),
					mpg: ((output[x].minutes)/output[x].games).toFixed(2),
					group: output[x].split_title,
					split: output[x].split
				}
				splits_collect.push(split)
		}
		callback(splits_collect);
	})
	}

	factory.getGamelogs = function(player, callback){
		console.log('factory get games', player);
		var new_url = player.split(' ').join('+');
		$http.get('gamelog/'+new_url).success(function (output){
			console.log('output', output);
			var gamelog = []
			for (game in output)
			{
				output[game].fppg = (((output[game].asts)*1.5)+((output[game].blks)*2)+((output[game].dbldbl)*1.5)+(output[game].pts)+((output[game].rebs)*1.25)+((output[game].stls)*2)+((output[game].threes)*.5)-((output[game].tovs)*.5)).toFixed(2)
			}
			console.log('output2', output);
			callback(output);
		})
	}



	return factory
})