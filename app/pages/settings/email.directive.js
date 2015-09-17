(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsEmail', directiveFn);

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
			require: '^form',
			templateUrl: 'app/pages/settings/email.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedbackFactory = new FeedbackFactory(vm.feedback);

			init();

			function cancel() {
				init();
				feedbackFactory.init();
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
				if (vm.email === vm.confirm) {
					settingsService.changeEmail(vm.currentEmail, vm.email, vm.password, feedbackFactory);
				} else {
					// handled by jdtEmailMatch.
					feedbackFactory.error("New Email and Confirm New Email must match.");
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
