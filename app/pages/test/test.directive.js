(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtTest', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'testConstants', 'testDaoFactory', '$log', 'rx'];

	function directiveFn(feedbackFactory, testConstants, testDaoFactory, $log, rx) {
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
			vm.props.title = testConstants.title;
			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// RxJS, just tinkering.
			// useful if callback provided parameter to another function.
			var fn = rx.Observable.fromCallback(testDaoFactory.syncArray);
			fn(null, feedback).subscribe(onNext, onError, onComplete);

			function onNext(data) {
				vm.data = data;
			}

			function onError(error) {
				$log.error(error);
			}

			function onComplete() {
				// $log.debug('rx fromCallbak complete');
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
