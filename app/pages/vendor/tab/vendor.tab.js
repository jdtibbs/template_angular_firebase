(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorTab', directiveFn);

	directiveFn.$inject = ['baseTabEditControllerService', 'baseTabListControllerService', 'catalogConstants', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx', '$routeParams', '$timeout'];

	function directiveFn(baseTabEditControllerService, baseTabListControllerService, catalogConstants, feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx, $routeParams, $timeout) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			require: '^form',
			templateUrl: 'app/pages/vendor/tab/vendor.tab.html'
		};

		function controllerFn() {
			var vm = this;

			vm.tab = {
				catalog: {
					select: function() {
						baseTabListControllerService.init(vm.props, catalogConstants);
						vm.tab.catalog.show = true; // do not load data until user hits this tab.
					}
				},
				vendor: {
					select: function() {
						baseTabEditControllerService.init(vm.props);
					}
				}
			};
		}
	}
})();
