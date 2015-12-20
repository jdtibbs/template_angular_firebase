(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorTab', directiveFn);

	directiveFn.$inject = ['editToolbarFactory', 'listTabToolbarFactory', 'catalogConstants', 'catalogRouteFactory', 'feedbackFactory', 'routeParamsFactory', 'vendorConstants', 'vendorRouteFactory', '$location', '$log'];

	function directiveFn(editToolbarFactory, listTabToolbarFactory, catalogConstants, catalogRouteFactory, feedbackFactory, routeParamsFactory, vendorConstants, vendorRouteFactory, $location, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/vendor/tab/vendor.tab.html'
		};

		function controllerFn() {
			var vm = this;

			// TODO when in vendor add mode disable Catalog tab.
			vm.tab = {
				catalog: {
					select: function() {
						// vm.tab.catalog.show = true; // do not load data until user hits this tab.
						vm.props.components = listTabToolbarFactory(vendorConstants, vendorRouteFactory, catalogRouteFactory);
						$log.debug(vm.props.components);
						vm.props.tab.active.catalog = true;
						vm.props.tab.active.vendor = false;
						// TODO make generic and place in factory.
						vm.props.components.buttons.add = function() {
							var vendorKey = routeParamsFactory.getParam(vendorConstants.dao);
							if (vendorKey) {
								$location.path(catalogConstants.pathEdit + vendorConstants.dao + '/' + vendorKey);
							} else {
								$location.path(catalogConstants.pathEdit + vendorConstants.dao + '/' + vm.props.parent.keys.vendor);
							}
						};
					}
				},
				vendor: {
					select: function() {
						vm.props.components = editToolbarFactory(vendorConstants, vendorRouteFactory);
						vm.props.tab.active.catalog = false;
						vm.props.tab.active.vendor = true;
					}
				}
			};
		}
	}
})();
