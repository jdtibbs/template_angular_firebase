(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorEdit', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx', '$routeParams', '$timeout'];

	function directiveFn(feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx, $routeParams, $timeout) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			require: '^form',
			templateUrl: 'app/pages/vendor/edit/edit.directive.html'
		};

		function controllerFn() {
			var vm = this;

			// TODO: make factory to build this for all edit directives.

			vm.props.title = {
				back: {
					action: cancel,
					show: true
				},
				text: vendorConstants.titleEdit
			};
			vm.feedback = {};
			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			var feedback = feedbackFactory(vm.feedback);

			initModel();

			function initModel() {
				if ($routeParams.key) {
					var fn = rx.Observable.fromCallback(vendorDaoFactory.syncObject);
					fn($routeParams.key, feedback).subscribe(onNext, onError, onComplete);
				} else {
					vm.add = true;
					vm.model = {};
				}

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
				feedback.init();
				$location.path(vendorConstants.path);
			}

			function save() {
				feedback.init();
				// RxJS, just tinkering.
				// useful if callback provided parameter to another function.
				if (vm.add) {
					var fn = rx.Observable.fromCallback(vendorDaoFactory.add);
					fn(vm.model, feedback).subscribe(onNext, onError, onComplete);
				} else {
					var sfn = rx.Observable.fromCallback(vendorDaoFactory.save);
					sfn(vm.model, feedback).subscribe(onNext, onError, onComplete);
				}

				function onNext(ref) {
					// $log.debug('saved:');
					// $log.debug(ref);
				}

				function onError(error) {
					$log.error(error);
				}

				function onComplete() {
					// $log.debug('rx fromCallbak complete');
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
