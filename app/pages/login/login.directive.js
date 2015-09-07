(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['$location', '$log', 'loginService'];

	function directiveFn($location, $log, loginService) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/login/login.directive.html'
		};

		function controllerFn() {
			var vm = this;

			vm.login = function() {
				loginService.login(vm.email, vm.password);
			};
			vm.forgot = function() {
				$log.debug('forgot');
			};
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
