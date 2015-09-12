(function() {
	'use strict';

	angular.module('app')
		.directive('jdtApp', directiveFn);

	directiveFn.$inject = ['$log', '$mdSidenav'];

	function directiveFn($log, $mdSidenav) {
		return {
			restrict: 'E',
			scope: {},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/app.directive.html'
		};

		function controllerFn() {
			var vm = this;

			vm.props = {
				app: {
					title: 'App Name'
				}
			};

			// TODO move to sidenav directive.
			vm.props.sidenav = {
				id: 'sidenav',
				toggle: function() {
					$mdSidenav(this.id).toggle();
				},
				close: function() {
					$mdSidenav(this.id).close();
				}
			};
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
