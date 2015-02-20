dfs.directive('accordion', function ($compile, $templateCache){
	console.log('faaahhhhhh q')
	var getTemplate = function() {
		$templateCache.put('templateID.html', 'This is the content of the template');
<<<<<<< HEAD:client/angular/directives/popover.js
		// console.log($templateCache.get('popover_template.html'));
		return $templateCache.get('popover_template.html');
=======
		console.log($templateCache.get('accordion_template.html'));
		return $templateCache.get('accordion_template.html');
>>>>>>> 24a56afc65c59005e756f8b425d4300c644280a4:client/angular/directives/accordion.js
	}
	return {
		restrict: "A",
		transclude: true,
		template: "<span ng-transclude></span>",
		link: function (scope, element, attrs) {
<<<<<<< HEAD:client/angular/directives/popover.js
			// console.log(scope.splits);
			var popOverContent;
=======
			console.log(scope.splits);
			var accordionContent;
>>>>>>> 24a56afc65c59005e756f8b425d4300c644280a4:client/angular/directives/accordion.js
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