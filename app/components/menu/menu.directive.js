(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['vendorConstants', 'loginService', '$location', '$log'];

	function directiveFn(vendorConstants, loginService, $location, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/menu/menu.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.click = click;
			vm.logout = logout;
			vm.menu = {
				items: []
			};

			// TODO remove temp menu item.
			vm.menu.items.push(new Menu('Vendors', vendorConstants.path));

			function click(path) {
				vm.props.components.sidenav.service.close();
				$location.path(path);
			}

			function logout(path) {
				vm.props.components.sidenav.service.close();
				loginService.logout();
			}

			function Menu(title, path) {
				this.title = title;
				this.path = path;
			}
		}
	}
})();
