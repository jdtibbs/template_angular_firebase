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

			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			var dao = firebaseDaoFactory(vendorConstants);

			initModel(vendorRouteFactory.getParam(vendorConstants.dao));

			function initModel(key) {
				if (key) {
					dao.syncObject(key, feedback, onNext);
				} else {
					vm.add = true;
					vm.props.tab.disable = {
						catalog: true
					};
					vm.model = {};
				}

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

				if (vm.add) {
					dao.add(vm.model, feedback, onAdd);
				} else {
					dao.save(vm.model, feedback);
				}

				function onAdd(ref) {
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
