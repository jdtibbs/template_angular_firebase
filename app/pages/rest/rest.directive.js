(function() {
	'use strict';

	angular.module('rest.module')
		.directive('jdtRest', directiveFn);

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
			templateUrl: 'app/pages/rest/rest.directive.html'
		};
	}

	controllerFn.$inject = ['baseToolbarFactory', 'restConstants', '$resource', '$log'];

	function controllerFn(baseToolbarFactory, restConstants, $resource, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = baseToolbarFactory(restConstants);

		var rest = $resource('http://localhost:3000');
		rest.get().$promise.then(function(result) {
			$log.debug(result);
		});

	}

})();