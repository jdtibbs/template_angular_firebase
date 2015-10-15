(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['feedbackFactory', '$log', 'loginConstants', 'loginService'];

	function directiveFn(feedbackFactory, $log, loginConstants, loginService) {
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
			vm.props.title = {
				text: loginConstants.title
			};
			vm.props.toolbar.service.init();

			vm.feedback = {};
			vm.login = login;
			vm.forgot = forgot;

			function forgot() {
				feedback.init();
				loginService.resetPassword(vm.email, feedback);
			}

			function login() {
				feedback.init();
				loginService.login(vm.email, vm.password, feedback);
			}

			var feedback = feedbackFactory(vm.feedback);
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
