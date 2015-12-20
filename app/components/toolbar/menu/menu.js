(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtToolbarMenu', directiveFn);

	function directiveFn() {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/menu/menu.html'
		};
	}

	function controllerFn() {}
})();
