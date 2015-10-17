(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHome', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['$log', 'baseControllerService', 'homeConstants'];

	function directiveDefinitionObject($log, baseControllerService, homeConstants) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/home/home.directive.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;

			baseControllerService.init(vm.props, homeConstants);
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
