(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', 'testDaoService', '$log', 'testConstants'];

	function directiveFn(FeedbackFactory, testDaoService, $log, testConstants) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/test/test.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.feedback = {};
			var feedbackFactory = new FeedbackFactory(vm.feedback);

			testDaoService.syncArray(null, feedbackFactory, syncArray);

			function syncArray(data) {
				vm.data = data;
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
