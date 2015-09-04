(function() {
	'use strict';

	angular
		.module('app', [
			'ngMaterial',
			'templates'
		]);

	angular.module('app')
		.directive('jdtApp', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['$log', '$mdSidenav'];

	function directiveDefinitionObject($log, $mdSidenav) {
		var ddo = {
			restrict: 'E',
			scope: {},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/app.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
			init();

			function init() {
				initProps();
			}

			vm.toggleSidenav = function(menuId) {
				$mdSidenav(menuId).toggle();
			};

			vm.menu1 = function() {
				menuClose('menu1');
			};

			vm.menu2 = function() {
				menuClose('menu2');
			};

			function menuClose(menu) {
				$mdSidenav('left').close()
					.then(function() {
						$log.debug(menu);
					});
			}

			function initProps() {
				vm.props = {};
				vm.props.menu = {
					items: []
				};
				vm.props.loggedIn = false;
				vm.props.auth = null;
				vm.props.login = null;
				vm.props.user = null;
			}

		}

		function linkFn(scope, elem, attrs) {}
	}
})();
