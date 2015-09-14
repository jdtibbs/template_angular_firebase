(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtFeedback', directiveDefinitionObject);

	directiveDefinitionObject.$inject = [];

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				feedback: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/feedback/feedback.directive.html'
		};

		return ddo;

		function controllerFn() {}

		function linkFn(scope, elem, attrs) {}
	}
})();
