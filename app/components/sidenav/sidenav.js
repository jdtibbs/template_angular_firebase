(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSidenav', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['sidenavFactory', '$log'];

	function directiveDefinitionObject(sidenavFactory, $log) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '=',
				sidenav: '=components'
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/sidenav/sidenav.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}

		function linkFn(scope, element, attr) {
			// scope.vm.sidenav = {
			// factory: sidenavFactory(element)
			// };
		}
	}
})();
