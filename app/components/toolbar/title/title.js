(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtToolbarTitle', directiveDefinitionObject);

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/title/title.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}

	}
})();
