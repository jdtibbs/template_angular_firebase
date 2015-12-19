(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['baseToolbarFactory', 'feedbackFactory', '$log', 'loginConstants', 'loginService'];

	function directiveFn(baseToolbarFactory, feedbackFactory, $log, loginConstants, loginService) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/login/login.directive.html'
		};

		function controllerFn() {
			var vm = this;

			// build up child component properties.
			vm.props.components = baseToolbarFactory(loginConstants);

			vm.login = login;
			vm.forgot = forgot;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			function forgot() {
				feedback.init();
				loginService.resetPassword(vm.email, feedback);
			}

			function login() {
				feedback.init();
				loginService.login(vm.email, vm.password, feedback);
			}

		}
	}
})();
