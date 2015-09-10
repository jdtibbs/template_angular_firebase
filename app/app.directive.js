(function() {
	'use strict';

	angular.module('app')
		.directive('jdtApp', directiveFn);

	directiveFn.$inject = ['$log'];

	function directiveFn($log) {
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
			vm.props.appTitle = 'App Name';
			vm.props.auth = null;
			vm.props.loggedIn = false;
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
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
