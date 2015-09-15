(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', '$log', 'loginService'];

	function directiveFn(FeedbackFactory, $log, loginService) {
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
			vm.feedback = {};
			vm.login = login;
			vm.forgot = forgot;

			var feedbackFactory = new FeedbackFactory(vm.feedback);

			function forgot() {
				loginService.forgot(feedbackFactory);
			}

			function login() {
				loginService.login(vm.email, vm.password, feedbackFactory);
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
