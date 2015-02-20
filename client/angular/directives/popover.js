dfs.directive('popOver', function ($compile, $templateCache){
	console.log('faaahhhhhh q')
	var getTemplate = function() {
		$templateCache.put('templateID.html', 'This is the content of the template');
		// console.log($templateCache.get('popover_template.html'));
		return $templateCache.get('popover_template.html');
	}
	return {
		restrict: "A",
		transclude: true,
		template: "<span ng-transclude></span>",
		link: function (scope, element, attrs) {
			// console.log(scope.splits);
			var popOverContent;
			if(scope.splits) {
				console.log('hello');
				var html = getTemplate();
				popOverContent = $compile(html)(scope);

				var options = {
					content: popOverContent,
					placement: 'right',
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