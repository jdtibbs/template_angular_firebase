(function() {
	'use strict';

	angular.module('jdt.menu')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['$log', '$mdSidenav'];

	function directiveFn($log, $mdSidenav) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/menu/menu.directive.html'
		};

		function controllerFn() {
			var vm = this;

			vm.click = function(menu) {
				closeSidenav(menu);
				// TODO handle specific menu selection.
			};

			function closeSidenav(menu) {
				$mdSidenav(vm.props.sidenav.id).close()
					.then(function() {
						$log.debug(menu);
					});
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
