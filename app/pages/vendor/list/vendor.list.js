(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorList', directiveFn);

	directiveFn.$inject = ['listToolbarFactory', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', 'vendorRouteFactory', '$location', '$log', 'rx'];

	function directiveFn(listToolbarFactory, feedbackFactory, vendorConstants, vendorDaoFactory, vendorRouteFactory, $location, $log, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/vendor/list/vendor.list.html'
		};

		function controllerFn() {
			var vm = this;

			vm.props.tab = {
				active: {
					catalog: false,
					vendor: false
				}
			};

			// build up child component properties.
			vm.props.components = listToolbarFactory(vendorConstants, vendorRouteFactory);
			$log.debug(vm.props.components);

			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// TODO: make a service to build this for all list controllers.

			var fn = rx.Observable.fromCallback(vendorDaoFactory.syncArray);
			var observer = rx.Observer.create(
				function onNext(data) {
					vm.data = data;
				},
				function onError(error) {
					$log.error(error);
					feedback.error(error);
				});
			fn(null, feedback).subscribe(observer);


			function edit(key) {
				$location.path(vendorRouteFactory.editRoute(key));
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
