(function() {
	'use strict';

	angular.module('app')
		.directive('jdtApp', directiveFn);

	directiveFn.$inject = ['loginService', '$location', '$log'];

	function directiveFn(loginService, $location, $log) {
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
			init();

			function init() {
				vm.props = {};
				vm.props.appTitle = 'App Name';
				vm.props.login = null;
				vm.props.user = null;
				vm.props.sidenav = {
					id: 'sidenav',
					toggle: function() {
						// $mdSidenav(this.id).toggle();
					},
					close: function() {
						// $mdSidenav(this.id).close();
					}
				};

				initAuthData();
				onAuth();
			}

			function initAuthData() {
				// if user is logged and hits browser refresh, we want to reload authentication state.
				vm.props.authData = loginService.authData();
			}

			function onAuth() {
				// handle changes in authentication state.
				loginService.authObj().$onAuth(function(authData) {
					vm.props.authData = authData;
					// $log.debug(vm.props.authData);
					if (authData) {
						$log.debug("Logged in:", authData.uid);
						$location.path('/home');
					} else {
						$log.debug("Logged out.");
						$location.path('/login');
					}
				});
			}
		}

		function linkFn(scope, elem, attrs) {
			// init();

			// function init() {
			// 	var off = scope.$on('$locationChangeStart', locationChangeStartFn);

			// 	function locationChangeStartFn(event, newUrl) {
			// 		// hide drawer
			// 		angular.element(elem[0].querySelector('.mdl-layout__drawer')).removeClass("is-visible");
			// 	}

			// 	scope.$on('$destroy', function() {
			// 		off();
			// 	});
			// }
			componentHandler.upgradeElement(elem[0]);

		}
	}
})();
