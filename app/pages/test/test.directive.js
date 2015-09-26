(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['FirebaseDaoFactory', '$log', 'testConstants'];

	function directiveFn(FirebaseDaoFactory, $log, testConstants) {
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

			var dao = new FirebaseDaoFactory(testConstants);
			vm.data = dao.syncArray(dao.ref());
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
