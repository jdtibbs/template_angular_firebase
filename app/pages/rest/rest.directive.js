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

	controllerFn.$inject = ['baseToolbarFactory', 'feedbackFactory', 'restConstants', '$resource', '$log'];

	function controllerFn(baseToolbarFactory, feedbackFactory, restConstants, $resource, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = baseToolbarFactory(restConstants);

		vm.feedback = {};
		var feedback = feedbackFactory(vm.feedback);

		var resource = $resource('http://localhost:3000');
		resource.get()
			.$promise
			.then(function(result) {
				$log.debug(result);
				vm.model = result.payload;
			}, function(error) {
				$log.error(error);
				feedback.error('Error executing RESTful service.');
			});

	}

})();
