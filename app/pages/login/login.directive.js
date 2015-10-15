(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['baseControllerService', 'feedbackFactory', '$log', 'loginConstants', 'loginService'];

	function directiveFn(baseControllerService, feedbackFactory, $log, loginConstants, loginService) {
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

			baseControllerService.init(vm.props, loginConstants);

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

		function linkFn(scope, elem, attrs) {}
	}
})();
