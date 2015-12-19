(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtListTabToolbar', directiveFn);

	function directiveFn() {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/listTab/list.tab.toolbar.html'
		};
	}

	function controllerFn() {}
})();
