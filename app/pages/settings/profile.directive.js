(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsProfile', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', '$log'];

	function directiveFn(FeedbackFactory, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/settings/profile.directive.html'
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
				vm.firstName = null;
				vm.lastName = null;
			}

			function save() {
				$log.debug(vm.firstName);
				$log.debug(vm.lastName);
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
