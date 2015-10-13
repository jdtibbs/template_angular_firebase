(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorList', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'toolbarFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx'];

	function directiveFn(feedbackFactory, toolbarFactory, vendorConstants, vendorDaoFactory, $location, $log, rx) {
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
			vm.feedback = {};

			var toolbar = toolbarFactory(vm.props);
			toolbar.showAdd();
			toolbar.showSearch();

			vm.remove = remove;
			vm.click = click;

			var feedback = feedbackFactory(vm.feedback);

			// RxJS, just tinkering.
			// useful if callback provided parameter to another function.
			var fn = rx.Observable.fromCallback(vendorDaoFactory.syncArray);
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

			function add() {
				$location.path(vendorConstants.pathAdd);
			}

			function click(key) {
				$location.path(vendorConstants.pathEdit + key);
			}

			function remove(key, event) {
				event.stopPropagation();
				var fn = rx.Observable.fromCallback(vendorDaoFactory.remove);
				fn(key, feedback).subscribe(onNextRemove, onErrorRemove, onCompleteRemove);

				function onNextRemove(ref) {}

				function onErrorRemove(error) {
					$log.error(error);
				}

				function onCompleteRemove() {
					// $log.debug('rx fromCallbak complete');
				}
			}
		}

		function linkFn(scope, elem, attrs) {
			// scope.$on('$destroy', function() {
			// 	scope.vm.props.toolbar.add = {};
			// });
		}
	}
})();
