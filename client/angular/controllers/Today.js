dfs.controller('Today', function($scope, Factory){
	console.log('first?')
	Factory.getToday(function(output){
		// console.log('controller get');
		// $scope.days = output[0];
		$scope.players = output;
		console.log(output);
	})

	$scope.oneAtATime = true;

	$scope.changeSorting = function(column)
		{
			// $scope.sort={column: column, descending: false};
			console.log($scope.sort);
			if(!$scope.sort){
				// console.log('hello');
				$scope.sort={column: column, descending: false};
			}
			// console.log('SORT YOU MOFO', $scope.sort);
			// console.log('SORT', column);
			// var sort = $scope.sort;

			if($scope.sort.column == column)
			{
				// console.log('sorting', $scope.sort.descending);
				$scope.sort.descending = !$scope.sort.descending;
				// console.log($scope.sort);
			}
			else{
				// console.log('SOOOOORT');
				$scope.sort.column = column;
				$scope.sort.descending = false;
			}
		}

		$scope.isLessThan = function (player)
		{
			// console.log(typeof($scope.price_max));
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
		// console.log('output', output)
		// for (x in output)


		$scope.splits = output;
		console.log('show_player output', $scope.splits)
	})

	}
});