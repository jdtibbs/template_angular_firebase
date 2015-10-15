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
			vm.props.toolbar.service.init();

			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			initModel();

			function initModel() {
				if ($routeParams.key) {
					var fn = rx.Observable.fromCallback(vendorDaoFactory.syncObject);
					fn($routeParams.key, feedback).subscribe(onNext, onError);
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
			}

			function cancel() {
				feedback.init();
				$location.path(vendorConstants.path);
			}

			function save() {
				feedback.init();
				// RxJS, just tinkering.
				var fn;
				if (vm.add) {
					fn = rx.Observable.fromCallback(vendorDaoFactory.add);
				} else {
					fn = rx.Observable.fromCallback(vendorDaoFactory.save);
				}
				fn(vm.model, feedback).subscribe(onNext, onError);

				function onNext(ref) {
					// $log.debug('saved:');
					// $log.debug(ref);
				}

				function onError(error) {
					$log.error(error);
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
