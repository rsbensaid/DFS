dfs.directive('accordion', function ($compile, $templateCache){
	console.log('faaahhhhhh q')
	var getTemplate = function() {
		$templateCache.put('templateID.html', 'This is the content of the template');
		console.log($templateCache.get('accordion_template.html'));
		return $templateCache.get('accordion_template.html');
	}
	return {
		restrict: "A",
		transclude: true,
		template: "<span ng-transclude></span>",
		link: function (scope, element, attrs) {
			console.log(scope.splits);
			var accordionContent;
			if(scope.splits) {
				console.log('hello');
				var html = getTemplate();
				accordionContent = $compile(html)(scope);

				var options = {
					heading: accordionContent,
					trigger: 'click',
					html: true,
					title: accordionContent
				};
				// $(element).accordion(options);
			}
		}
		// scope: {
		// 	splits: '=',
		// title: '@'
		// }
	};
});