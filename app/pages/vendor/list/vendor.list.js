(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtVendorList', directiveFn);

	directiveFn.$inject = ['catalogConstants', 'feedbackFactory', 'firebaseDaoOneToManyFactory', 'toolbarListFactory', 'vendorConstants', 'vendorRouteFactory', '$location', '$log'];

	function directiveFn(catalogConstants, feedbackFactory, firebaseDaoOneToManyFactory, toolbarListFactory, vendorConstants, vendorRouteFactory, $location, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
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
			vm.props.components = toolbarListFactory(vendorConstants, vendorRouteFactory);

			vm.data = [];
			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			var dao = firebaseDaoOneToManyFactory(vendorConstants, catalogConstants);

			(function() {
				dao.syncArray(null, feedback, onNext);

				function onNext(data) {
					vm.data = data;
				}
			})();

			// TODO make a factory for button functions, 
			// listButtonFactory(routeFactory, daoFactory).
			// editButtonFactory(routeFactory, daoFactory).

			function edit(key) {
				$location.path(vendorRouteFactory.editRoute(key));
			}

			function remove(key, event) {
				event.stopPropagation();
				dao.remove(key, feedback);
			}
		}
	}
})();
