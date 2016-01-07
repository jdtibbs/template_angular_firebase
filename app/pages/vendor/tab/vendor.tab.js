(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorTab', directiveFn);

	directiveFn.$inject = ['toolbarEditFactory', 'toolbarEditListFactory', 'catalogConstants', 'catalogRouteFactory', 'feedbackFactory', 'routeParamsFactory', 'vendorConstants', 'vendorRouteFactory', '$location', '$log'];

	function directiveFn(toolbarEditFactory, toolbarEditListFactory, catalogConstants, catalogRouteFactory, feedbackFactory, routeParamsFactory, vendorConstants, vendorRouteFactory, $location, $log) {
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

			vm.tab = {
				catalog: {
					select: function() {
						vm.props.components = toolbarEditListFactory(vendorConstants, vendorRouteFactory, catalogRouteFactory);
						vm.props.tab.active.catalog = true;
						vm.props.tab.active.vendor = false;
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
						vm.props.components = toolbarEditFactory(vendorConstants, vendorRouteFactory);
						vm.props.tab.active.catalog = false;
						vm.props.tab.active.vendor = true;
					}
				}
			};
		}
	}
})();
