(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtEdit', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'listConstants', 'listDaoFactory', '$location', '$log', 'rx', '$routeParams', '$timeout'];

	function directiveFn(feedbackFactory, listConstants, listDaoFactory, $location, $log, rx, $routeParams, $timeout) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/list/edit/edit.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.props.title = listConstants.titleEdit;
			vm.feedback = {};
			vm.cancel = cancel;
			vm.save = save;

			var feedback = feedbackFactory(vm.feedback);

			initModel();

			function initModel() {
				var fn = rx.Observable.fromCallback(listDaoFactory.syncObject);
				fn($routeParams.key, feedback).subscribe(onNext, onError, onComplete);

				function onNext(data) {
					vm.model = data;
				}

				function onError(error) {
					$log.error(error);
				}

				function onComplete() {
					// $log.debug('rx fromCallbak complete');
				}
			}

			function cancel() {
				$location.path('/list');
			}

			function save() {
				$log.debug('save: ' + vm.model);
				// RxJS, just tinkering.
				// useful if callback provided parameter to another function.
				var fn = rx.Observable.fromCallback(listDaoFactory.save);
				fn(vm.model, feedback).subscribe(onNext, onError, onComplete);

				function onNext(ref) {
					$log.debug('saved:');
					$log.debug(ref);
				}

				function onError(error) {
					$log.error(error);
				}

				function onComplete() {
					// $log.debug('rx fromCallbak complete');
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
