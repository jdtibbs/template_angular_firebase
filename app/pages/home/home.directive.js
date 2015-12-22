(function() {
	'use strict';

	angular.module('home.module')
		.directive('jdtHome', directiveFn);

	function directiveFn() {
		return {
			restrict: 'E',
			scope: {
				// 	TODO move to bindToController.
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: {
				props: '='
			},
			templateUrl: 'app/pages/home/home.directive.html'
		};
	}

	controllerFn.$inject = ['baseToolbarFactory', 'homeConstants', '$log'];

	function controllerFn(baseToolbarFactory, homeConstants, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = baseToolbarFactory(homeConstants);
	}

})();
