(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'testDaoService', '$log', 'testConstants'];

	function directiveFn(feedbackFactory, testDaoService, $log, testConstants) {
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
			var feedback = feedbackFactory(vm.feedback);

			testDaoService.syncArray(null, feedback, syncArray);

			function syncArray(data) {
				vm.data = data;
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
