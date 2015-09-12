(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['loginService', '$location', '$log'];

	function directiveFn(loginService, $location, $log) {
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
			vm.menu = {
				items: []
			};

			// TODO remove temp menu item.
			vm.menu.items.push(new Menu('Test', '#/test'));

			//  TODO load menu from datastore.

			vm.logout = function(path) {
				loginService.logout();
			};

			function Menu(title, path) {
				this.title = title;
				this.path = path;
			}
		}

		function linkFn(scope, elem, attrs) {
			componentHandler.upgradeElement(elem[0]);
		}
	}
})();
