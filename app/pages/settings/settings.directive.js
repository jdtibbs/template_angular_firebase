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

	controllerFn.$inject = ['toolbarFactory', 'settingsConstants', '$log'];

	function controllerFn(toolbarFactory, settingsConstants, $log) {
		var vm = this;

		// build up child component properties.
		vm.props.components = toolbarFactory(settingsConstants);
	}
})();
