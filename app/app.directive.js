(function() {
	'use strict';

	angular.module('app')
		.directive('jdtApp', directiveFn);

	directiveFn.$inject = ['$location', '$log', 'loginService', '$mdSidenav', 'toolbarFactory'];

	function directiveFn($location, $log, loginService, $mdSidenav, toolbarFactory) {
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

			// initialize root properties. 
			vm.props = {
				wasLoggedIn: false,
				toolbar: toolbarFactory()
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

		function linkFn(scope, elem, attrs) {
			// build sidenav object to allow menu directive to toggle and close..
			// tried placing sidenav in its own directive but was unable to so far to make layout work properly. 
			var sidenav = angular.element(elem[0]).find('md-sidenav')[0].attributes.getNamedItem('md-component-id').value;
			scope.vm.props.sidenav = {
				id: sidenav,
				toggle: function() {
					$mdSidenav(this.id).toggle();
				},
				close: function() {
					$mdSidenav(this.id).close();
				}
			};
		}
	}
})();
