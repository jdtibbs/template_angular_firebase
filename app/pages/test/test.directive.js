(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['FirebaseFactory', '$log', 'testConstants'];

	function directiveFn(FirebaseFactory, $log, testConstants) {
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

			var dao = new FirebaseFactory(testConstants);
			vm.data = dao.syncArray(dao.ref());
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
