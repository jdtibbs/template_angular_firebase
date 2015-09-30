(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'testDaoFactory', '$log', 'testConstants'];

	function directiveFn(feedbackFactory, testDaoFactory, $log, testConstants) {
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

			testDaoFactory.syncArray(null, feedback, syncArray);

			function syncArray(data) {
				vm.data = data;
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
