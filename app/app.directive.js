(function() {
	'use strict';

	angular.module('app')
		.directive('jdtApp', directiveFn);

	directiveFn.$inject = ['$location', '$log', 'loginService', '$mdSidenav'];

	function directiveFn($location, $log, loginService, $mdSidenav) {
		return {
			restrict: 'E',
			scope: {},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/app.directive.html'
		};

		function controllerFn() {
			var vm = this;

			// initialize root properties. 
			vm.props = {
				wasLoggedIn: false
			};

			// monitor login state.
			loginService.onAuth(onAuth);

			function onAuth(authData) {
				vm.props.authData = authData;
				if (authData) {
					vm.props.wasLoggedIn = true;
					$location.path('/home');
				} else {
					if (vm.props.wasLoggedIn) {
						$location.path('/login');
					} else {
						$location.path('/home');

					}
				}
			}
		}
	}
})();
