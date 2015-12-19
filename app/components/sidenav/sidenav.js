(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSidenav', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/sidenav/sidenav.html'
		};

		return ddo;

		function controllerFn() {}
	}
})();
