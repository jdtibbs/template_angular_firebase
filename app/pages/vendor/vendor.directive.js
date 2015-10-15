(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorList', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx'];

	function directiveFn(feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx) {
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

			// TODO: make factory to build this for all list controllers.

			vm.props.title = {
				text: vendorConstants.title
			};
			vm.props.toolbar.service.init();
			vm.props.toolbar.service.add.showButton();
			vm.props.toolbar.service.add.action = function() {
				$location.path(vendorConstants.pathAdd);
			};
			vm.props.toolbar.service.search.showButton();

			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// RxJS, just tinkering with it.
			var fn = rx.Observable.fromCallback(vendorDaoFactory.syncArray);
			fn(null, feedback).subscribe(onNext, onError);

			function onNext(data) {
				vm.data = data;
			}

			function onError(error) {
				$log.error(error);
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
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
