(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtBaseToolbar', directiveDefinitionObject);

	function directiveDefinitionObject() {
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

		function controllerFn() {
			var vm = this;
		}
	}
})();
