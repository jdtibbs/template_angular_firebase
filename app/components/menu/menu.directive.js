(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['loginService', '$location', '$log', '$mdSidenav'];

	function directiveFn(loginService, $location, $log, $mdSidenav) {
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
			vm.click = click;
			vm.logout = logout;
			vm.props.menu = {
				items: []
			};

			// TODO remove temp menu item.
			vm.props.menu.items.push(new Menu('Test', '/Test'));

			function click(path) {
				vm.props.sidenav.close();
				$location.path(path);
			}

			function logout(path) {
				vm.props.sidenav.close();
				loginService.logout();
			}

			function Menu(title, path) {
				this.title = title;
				this.path = path;
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
