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

			vm.props = {};
			vm.props.menu = {
				items: []
			};
			vm.props.appTitle = 'App Name';
			vm.props.auth = null;
			vm.props.loggedIn = false;
			vm.props.login = null;
			vm.props.user = null;
			vm.props.sidenav = {
				id: 'sidenav'
			};
			vm.toggleSidenav = function() {
				$mdSidenav(vm.props.sidenav.id).toggle();
			};
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
