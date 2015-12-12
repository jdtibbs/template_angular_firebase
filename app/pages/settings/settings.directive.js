(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettings', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/settings/settings.directive.html'
		};

		controllerFn.$inject = ['baseEditControllerService', 'settingsConstants', 'settingsRouteFactory'];

		return ddo;

		function controllerFn(baseEditControllerService, settingsConstants, settingsRouteFactory) {
			var vm = this;

			baseEditControllerService.init(vm.props, settingsConstants, settingsRouteFactory);

		}
	}
})();
