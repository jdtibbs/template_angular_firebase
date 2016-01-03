(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtCatalogList', directiveFn);

	directiveFn.$inject = ['firebaseDaoManyToOneFactory', 'feedbackFactory', 'catalogConstants', 'catalogRouteFactory', 'vendorConstants', '$location', '$log'];

	function directiveFn(firebaseDaoManyToOneFactory, feedbackFactory, catalogConstants, catalogRouteFactory, vendorConstants, $location, $log) {
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
					firebaseDaoManyToOneFactory(vendorConstants, catalogConstants)
						.syncArray(vendorKey, vm.data, feedback);
				}
			})();

			function edit(key) {
				$location.path(catalogRouteFactory.editRoute(key));
			}

			function remove(key, event) {
				event.stopPropagation();
				firebaseDaoManyToOneFactory(vendorConstants, catalogConstants)
					.remove(key, feedback);
			}
		}

	}
})();
