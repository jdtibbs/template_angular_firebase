(function() {
	'use strict';

	angular.module('vendor.module')
		.directive('jdtVendorEditTab', directiveFn);

	directiveFn.$inject = ['baseEditControllerService', 'feedbackFactory', 'vendorConstants', 'vendorDaoFactory', '$location', '$log', 'rx', '$routeParams', '$timeout'];

	function directiveFn(baseEditControllerService, feedbackFactory, vendorConstants, vendorDaoFactory, $location, $log, rx, $routeParams, $timeout) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			require: '^form',
			templateUrl: 'app/pages/vendor/edit/vendor.edit.tab.html'
		};

		function controllerFn() {
			var vm = this;

			vm.tab = {
				catalog: {
					select: function() {
						$log.debug('selected catalog tab.');
					}
				},
				vendor: {
					select: function() {
						$log.debug('selected vendor tab.');
					}
				}
			};
		}
	}
})();
