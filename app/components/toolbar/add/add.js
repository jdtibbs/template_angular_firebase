(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtToolbarAdd', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/add/add.html'
		};

		return ddo;

		function controllerFn() {}
	}
})();
