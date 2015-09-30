(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsPassword', directiveFn);

	directiveFn.$inject = ['feedbackFactory', '$log', 'passwordService'];

	function directiveFn(feedbackFactory, $log, passwordService) {
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
			templateUrl: 'app/pages/settings/password/password.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			function cancel() {
				feedback.init();
				init();
			}

			function init() {
				if (vm.form) {
					vm.form.$setPristine();
					vm.form.$setUntouched();
				}
				vm.password = null;
				vm.newPassword = null;
				vm.confirm = null;
			}

			function save() {
				feedback.init();
				if (vm.newPassword === vm.confirm) {
					var email = vm.props.authData.password.email;
					passwordService.changePassword(email, vm.password, vm.newPassword, feedback, init);
				} else {
					feedback.error('New password and confirm password must match.');
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
