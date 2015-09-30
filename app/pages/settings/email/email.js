(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsEmail', directiveFn);

	directiveFn.$inject = ['feedbackFactory', '$log', 'emailService'];

	function directiveFn(feedbackFactory, $log, emailService) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			require: '^form',
			templateUrl: 'app/pages/settings/email/email.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			init();

			function cancel() {
				feedback.init();
				init();
			}

			function init() {
				if (vm.form) {
					vm.form.$setPristine();
					vm.form.$setUntouched();
				}
				if (vm.props.authData) {
					vm.currentEmail = vm.props.authData.password.email;
				}
				vm.email = null;
				vm.confirm = null;
				vm.password = null;
			}

			function save() {
				feedback.init();
				if (vm.email === vm.confirm) {
					emailService.changeEmail(vm.currentEmail, vm.email, vm.password, feedback);
				} else {
					feedback.error("New Email and Confirm New Email must match.");
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
