(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSidenav', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['sidenavFactory'];

	function directiveDefinitionObject(sidenavFactory) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
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
			scope.vm.props.sidenav = sidenavFactory(element);
		}
	}
})();
