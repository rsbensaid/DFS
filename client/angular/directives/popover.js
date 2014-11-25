dfs.directive('popOver', function ($compile, $templateCache){
	var getTemplate = function() {
		$templateCache.put('templateID.html', 'This is the content of the template');
		console.log($templateCache.get('popover_template.html'));
		return $templateCache.get('popover_template.html');
	}
	return {
		restrict: "A",
		transclude: true,
		template: "<span ng-transclude></span>",
		link: function (scope, element, attrs) {
			var popOverContent;
			if(scope.splits) {
				var html = getTemplate();
				popOverContent = $compile(html)(scope);

				var options = {
					content: popOver,
					placement: 'right',
					html: true,
					title: scope.title
				};
				$(element).popover(options);
			}
		},
		scope: {
			splits: '=',
		title: '@'
		}
	};
});