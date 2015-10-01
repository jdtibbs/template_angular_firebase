(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtTitle', directiveDefinitionObject);

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
			templateUrl: 'app/components/title/title.html'
		};

		return ddo;

		function controllerFn() {}

		function linkFn(scope, elem, attrs) {}
	}
})();
