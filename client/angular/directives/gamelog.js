dfs.directive('gameLog', function ($compile, $templateCache){
	console.log('thats delicious')
	var getTemplate = function() {
		$templateCache.put('templateID.html', 'This is the content of the template');
		// console.log($templateCache.get('popover_template.html'));
		return $templateCache.get('gamelog_template.html');
	}
	return {
		restrict: "A",
		transclude: true,
		template: "<span ng-transclude></span>",
		link: function (scope, element, attrs) {
			console.log('popup mofugga', scope.games);
			var gameLogContent;
			if(scope.games) {
				console.log('hi');
				var html = getTemplate();
				gameLogContent = $compile(html)(scope);

				var options = {
					content: gameLogContent,
					placement: 'left',
					trigger: 'click',
					html: true,
					title: scope.title
				};
				$(element).popover(options);
			}
		}
		// scope: {
		// 	splits: '=',
		// title: '@'
		// }
	};
});