(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtListToolbar', directiveFn);

	function directiveFn() {
		return {
			restrict: 'E',
			scope: {
				props: '=',

			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/list/list.toolbar.html'
		};
	}

	function controllerFn() {
		var vm = this;
	}
})();
