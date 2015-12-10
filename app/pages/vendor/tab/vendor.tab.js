(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorTab', directiveFn);

	directiveFn.$inject = ['baseTabEditControllerService', 'baseTabListControllerService', 'catalogConstants', 'catalogRouteFactory', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx', '$routeParams', '$timeout'];

	function directiveFn(baseTabEditControllerService, baseTabListControllerService, catalogConstants, catalogRouteFactory, feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx, $routeParams, $timeout) {
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
						baseTabListControllerService.init(vm.props, catalogConstants, catalogRouteFactory);
						// vm.tab.catalog.show = true; // do not load data until user hits this tab.
						toggleTab();
					}
				},
				vendor: {
					select: function() {
						baseTabEditControllerService.init(vm.props);
						toggleTab();
					}
				}
			};

			function toggleTab() {
				// $log.debug('before toggleTab');
				// $log.debug(vm.props.tab.active);
				if (vm.props.tab.active.vendor) {
					vm.props.tab.active.catalog = !vm.props.tab.active.catalog;
					vm.props.tab.active.vendor = !vm.props.tab.active.vendor;
				} else {
					vm.props.tab.active.catalog = false;
					vm.props.tab.active.vendor = true;
				}
				// $log.debug('after toggleTab');
				// $log.debug(vm.props.tab.active);
			}
		}
	}
})();
