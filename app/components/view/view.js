(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtView', directiveDefinitionObject);

	directiveDefinitionObject.$inject = [];

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/view/view.html'
		};

		return ddo;

		function controllerFn() {}

		function linkFn(scope, elem, attrs) {}
	}
})();
