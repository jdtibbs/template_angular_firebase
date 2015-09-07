(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenu', directiveFn);

	directiveFn.$inject = ['$location', '$log', '$mdSidenav'];

	function directiveFn($location, $log, $mdSidenav) {
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
			vm.props.menu = {
				items: []
			};

			vm.props.menu.items.push(new Menu('Home', '/home'));
			vm.props.menu.items.push(new Menu('Login', '/login'));

			vm.click = function(path) {
				vm.props.sidenav.close();
				$location.path(path);
			};

			function Menu(title, path) {
				this.title = title;
				this.path = path;
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
