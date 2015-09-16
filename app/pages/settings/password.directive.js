(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsPassword', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', '$log', 'settingsService'];

	function directiveFn(FeedbackFactory, $log, settingsService) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/settings/password.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedbackFactory;

			init();

			function cancel() {
				init();
			}

			function init() {
				vm.password = null;
				vm.newPassword = null;
				vm.confirm = null;
			}

			function save() {
				feedbackFactory = new FeedbackFactory(vm.feedback);
				if (vm.newPassword === vm.confirm) {
					var email = vm.props.authData.password.email;
					settingsService.changePassword(email, vm.password, vm.newPassword, feedbackFactory, init);
				} else {
					feedbackFactory.error('New password and confirm password must match.');
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
