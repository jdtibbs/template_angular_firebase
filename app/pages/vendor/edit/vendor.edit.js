(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorEdit', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'firebaseDaoFactory', 'vendorConstants', 'vendorRouteFactory', '$location', '$log', '$route'];

	function directiveFn(feedbackFactory, firebaseDaoFactory, vendorConstants, vendorRouteFactory, $location, $log, $route) {
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

			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			var dao = firebaseDaoFactory(vendorConstants);

			(function() {
				var vendorKey = vendorRouteFactory.getParam(vendorConstants.dao);
				if (vendorKey) {
					initModel(vendorKey);
				} else {
					vm.add = true;
					vm.props.tab.disable = {
						catalog: true
					};
					vm.model = {};
				}
			})();

			function initModel(key) {
				dao.syncObject(key, feedback, onNext);

				function onNext(data) {
					vm.model = data;
					vm.add = false;
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
					dao.add(vm.model, feedback, onNext);
				} else {
					dao.save(vm.model, feedback);
				}

				function onNext(ref) {
					initModel(ref.key());

					vm.props.tab.disable = {
						catalog: false
					};
					// set parent key for use in routeParam in child view.
					vm.props.parent = {
						keys: {
							vendor: ref.key()
						}
					};
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
