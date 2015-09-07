(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['$location', '$log'];

	function directiveFn($location, $log) {
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
				$log.debug('login');
			};
			vm.forgot = function() {
				$log.debug('forgot');
			};
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
