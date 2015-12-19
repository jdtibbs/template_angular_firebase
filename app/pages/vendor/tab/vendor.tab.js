(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorTab', directiveFn);

	directiveFn.$inject = ['editToolbarFactory', 'listTabToolbarFactory', 'catalogRouteFactory', 'feedbackFactory', 'vendorConstants', 'vendorRouteFactory', '$location', '$log'];

	function directiveFn(editToolbarFactory, listTabToolbarFactory, catalogRouteFactory, feedbackFactory, vendorConstants, vendorRouteFactory, $location, $log) {
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
						// vm.tab.catalog.show = true; // do not load data until user hits this tab.
						vm.props.components = listTabToolbarFactory(vendorConstants, vendorRouteFactory, catalogRouteFactory);
						// toggleTab();
						vm.props.tab.active.catalog = true;
						vm.props.tab.active.vendor = false;
					}
				},
				vendor: {
					select: function() {
						vm.props.components = editToolbarFactory(vendorConstants, vendorRouteFactory);
						// toggleTab();
						vm.props.tab.active.catalog = false;
						vm.props.tab.active.vendor = true;
					}
				}
			};

			function toggleTab() {
				// do not call this function:
				// Causes Error: $rootScope:infdig
				if (vm.props.tab.active.vendor) {
					vm.props.tab.active.catalog = !vm.props.tab.active.catalog;
					vm.props.tab.active.vendor = !vm.props.tab.active.vendor;
				} else {
					vm.props.tab.active.catalog = false;
					vm.props.tab.active.vendor = true;
				}
			}
		}
	}
})();
