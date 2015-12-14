(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHome', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['baseControllerService', 'homeConstants', '$log'];

	function directiveDefinitionObject(baseControllerService, homeConstants, $log) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/home/home.directive.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;

			baseControllerService.init(vm.props, homeConstants);
		}

	}
})();
