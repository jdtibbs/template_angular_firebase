(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtCatalogList', directiveFn);

	directiveFn.$inject = ['firebaseDaoOneToManyFactory', 'feedbackFactory', 'catalogConstants', 'catalogRouteFactory', 'vendorConstants', '$location', '$log'];

	function directiveFn(firebaseDaoOneToManyFactory, feedbackFactory, catalogConstants, catalogRouteFactory, vendorConstants, $location, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/catalog/list/catalog.list.html'
		};

		function controllerFn() {
			var vm = this;

			vm.data = [];
			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// TODO: make a service to build this for all list controllers.
			(function() {
				var vendorKey = catalogRouteFactory.getParam(vendorConstants.dao);
				if (vendorKey) {
					firebaseDaoOneToManyFactory(vendorConstants, catalogConstants, feedback)
						.syncArray(vendorKey, vm.data);
				}
			})();

			function edit(key) {
				$location.path(catalogRouteFactory.editRoute(key));
			}

			function remove(key, event) {
				event.stopPropagation();
				firebaseDaoOneToManyFactory(vendorConstants, catalogConstants, feedback)
					.remove(key);
			}
		}

	}
})();
