(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtBaseToolbar', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '=',

			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/base/base.toolbar.html'
		};

		return ddo;

		function controllerFn() {}
	}
})();
