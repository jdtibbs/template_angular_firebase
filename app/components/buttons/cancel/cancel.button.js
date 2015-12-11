(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtCancelButton', directiveDefinitionObject);


	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/buttons/cancel/cancel.button.html'
		};

		controllerFn.$inject = ['$location'];

		return ddo;

		function controllerFn($location) {
			var vm = this;
			vm.button = {
				cancel: function() {
					$location.path(vm.props.button.cancel.route);
				}
			};
		}

	}
})();
