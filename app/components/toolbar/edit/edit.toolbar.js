(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtEditToolbar', directiveFn);


	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/edit/edit.toolbar.html'
		};

		return ddo;

		function controllerFn() {}
	}
})();
