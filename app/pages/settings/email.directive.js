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
			}

			function init() {
				vm.email = vm.props.authData.password.email;
				vm.password = null;
			}

			function save() {
				$log.debug(vm.email);
				var oldEmail = vm.props.authData.password.email;
				settingsService.changeEmail(oldEmail, vm.email, vm.password, feedbackFactory);
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
