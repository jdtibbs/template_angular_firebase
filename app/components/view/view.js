(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtView', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/view/view.html'
		};

		return ddo;

		function controllerFn() {}
	}
})();
