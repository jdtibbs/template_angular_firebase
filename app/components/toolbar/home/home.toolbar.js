(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHomeToolbar', directiveDefinitionObject);


	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/home/home.toolbar.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}
	}
})();
