dfs.controller('Today', function($scope, Factory){
	console.log('first?')
	Factory.getToday(function(output){
		// console.log('controller get');
		// $scope.days = output[0];
		$scope.players = output;
		console.log(output);
	})

	$scope.splits = 'hi'; 

	$scope.changeSorting = function(column)
		{
			console.log($scope.sort);
			if(!$scope.sort){
				$scope.sort={column: column, descending: false};
			}
			if($scope.sort.column == column)
			{
				$scope.sort.descending = !$scope.sort.descending;
			}
			else{
				$scope.sort.column = column;
				$scope.sort.descending = false;
			}
		}

		$scope.isLessThan = function (player)
		{
			if(typeof(parseInt($scope.price_max)) == 'number' && parseInt($scope.price_max) > 0)
			{
				return (player.price <= $scope.price_max)
			}
			else{
				return true
			}
		}


	$scope.show_player = function(player_name)
	{
		console.log('we tryin', player_name);
		Factory.getSplits(player_name, function (output){
		$scope.splits = output;
		console.log('show_player output', $scope.splits)
	})

	}
});