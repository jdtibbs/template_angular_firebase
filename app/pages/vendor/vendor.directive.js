(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorList', directiveFn);

	directiveFn.$inject = ['baseListControllerService', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx'];

	function directiveFn(baseListControllerService, feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/vendor/vendor.directive.html'
		};

		function controllerFn() {
			var vm = this;


			baseListControllerService.init(vm.props, vendorConstants);

			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// TODO: make a service to build this for all list controllers.

			// RxJS, just tinkering with it.
			var fn = rx.Observable.fromCallback(vendorDaoFactory.syncArray);
			fn(null, feedback).subscribe(onNext, onError);

			function onNext(data) {
				vm.data = data;
			}

			function onError(error) {
				$log.error(error);
				feedback.error(error);
			}

			function edit(key) {
				$location.path(vendorConstants.pathEdit + key);
			}

			function remove(key, event) {
				event.stopPropagation();
				var fn = rx.Observable.fromCallback(vendorDaoFactory.remove);
				fn(key, feedback).subscribe(onNextRemove, onErrorRemove);

				function onNextRemove(ref) {}

				function onErrorRemove(error) {
					$log.error(error);
					feedback.error(error);
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
