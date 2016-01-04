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

			initModel();

			function initModel() {
				var vendorKey = vendorRouteFactory.getParam(vendorConstants.dao);
				if (vendorKey) {
					dao.syncObject(vendorKey, feedback, onNext);
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
					dao.save(vm.model, feedback, onNext);
				}

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
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
