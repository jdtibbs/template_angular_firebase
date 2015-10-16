(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtFeedback', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['$timeout'];

	function directiveDefinitionObject($timeout) {
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

		function linkFn(scope, elem, attrs) {

			// clear success messages from view after a perios of time.
			scope.$watch('vm.feedback.success', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					$timeout(function() {
						scope.vm.feedback.success.length = 0;
					}, 2000);
				}
			});

		}
	}
})();
