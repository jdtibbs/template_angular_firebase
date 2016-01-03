(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorEdit', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'vendorConstants', 'vendorDaoFactory', 'vendorRouteFactory', '$location', '$log', '$route', 'rx'];

	function directiveFn(feedbackFactory, vendorConstants, vendorDaoFactory, vendorRouteFactory, $location, $log, $route, rx) {
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
					var fn = rx.Observable.fromCallback(vendorDaoFactory.syncObject.bind(vendorDaoFactory));
					fn(vendorKey, feedback).subscribe(onNext, onError);
				} else {
					vm.add = true;
					vm.props.tab.disable = {
						catalog: true
					};
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
				$location.path(vendorRouteFactory.listRoute());
			}

			function save() {
				feedback.init();
				var fn;
				if (vm.add) {
					fn = rx.Observable.fromCallback(vendorDaoFactory.add.bind(vendorDaoFactory));
				} else {
					fn = rx.Observable.fromCallback(vendorDaoFactory.save.bind(vendorDaoFactory));
				}
				fn(vm.model, feedback).subscribe(onNext, onError);

				function onNext(ref) {
					vm.props.tab.disable = {
						catalog: false
					};
					// set parent key for use in routeParam in child view.
					vm.props.parent = {
						keys: {
							vendor: ref.key()
						}
					};
					// to cause vendor key into routeParam for use in adding child data.
					// $location.path(vendorRouteFactory.editRoute(ref.key()));
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
