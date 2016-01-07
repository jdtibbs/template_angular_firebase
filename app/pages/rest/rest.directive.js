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

	controllerFn.$inject = ['toolbarFactory', 'feedbackFactory', 'restConstants', '$resource', '$log'];

	function controllerFn(toolbarFactory, feedbackFactory, restConstants, $resource, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = toolbarFactory(restConstants);

		vm.feedback = {};
		var feedback = feedbackFactory(vm.feedback);

		// TODO do not hard code $resource url.
		var resource = $resource('https://template-restful.herokuapp.com');
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
