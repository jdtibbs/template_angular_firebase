(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['loginService', 'restConstants', 'vendorConstants', '$location', '$log'];

	function directiveFn(loginService, restConstants, vendorConstants, $location, $log) {
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

			// TODO move temp menu items to de DB driven via menuDaoFactory.
			vm.menu.items.push(new Menu('Vendors', vendorConstants.path));
			vm.menu.items.push(new Menu('RESTful', restConstants.path));

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
