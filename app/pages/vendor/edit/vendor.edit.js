(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorEdit', directiveFn);

	directiveFn.$inject = ['baseEditControllerService', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', 'vendorRouteFactory', '$location', '$log', 'rx'];

	function directiveFn(baseEditControllerService, feedbackFactory, vendorConstants, vendorDaoFactory, vendorRouteFactory, $location, $log, rx) {
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
			templateUrl: 'app/pages/vendor/edit/vendor.edit.html'
		};

		function controllerFn() {
			var vm = this;

			baseEditControllerService.init(vm.props, vendorConstants, cancel);

			// TODO: make factory to build this for all edit directives.

			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			initModel();

			function initModel() {
				var vendorKey = vendorRouteFactory.getParam(vendorConstants.dao);
				if (vendorKey) {
					var fn = rx.Observable.fromCallback(vendorDaoFactory.syncObject);
					fn(vendorKey, feedback).subscribe(onNext, onError);
				} else {
					vm.add = true;
					vm.model = {};
				}

				function onNext(data) {
					vm.model = data;
				}

				function onError(error) {
					$log.error(error);
					feedback.error(error);
				}
			}

			function cancel() {
				feedback.init();
				$location.path(vendorConstants.path);
			}

			function save() {
				feedback.init();
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
					feedback.error(error);
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
