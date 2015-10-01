(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtList', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'listConstants', 'listDaoFactory', '$log', 'rx'];

	function directiveFn(feedbackFactory, listConstants, listDaoFactory, $log, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/list/list.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.props.title = listConstants.title;
			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// RxJS, just tinkering.
			// useful if callback provided parameter to another function.
			var fn = rx.Observable.fromCallback(listDaoFactory.syncArray);
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