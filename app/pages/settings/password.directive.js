(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsPassword', directiveFn);

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
			templateUrl: 'app/pages/settings/password.directive.html'
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
				vm.password = null;
				vm.confirm = null;
			}

			function save() {}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
