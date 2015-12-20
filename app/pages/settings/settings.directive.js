(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettings', directiveFn);

	function directiveFn() {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/pages/settings/settings.directive.html'
		};
	}

	controllerFn.$inject = ['baseToolbarFactory', 'settingsConstants', '$log'];

	function controllerFn(baseToolbarFactory, settingsConstants, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = baseToolbarFactory(settingsConstants);
	}
})();
