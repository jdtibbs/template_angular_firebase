(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtEditToolbar', directiveDefinitionObject);


	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '=',

			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/edit/edit.toolbar.html'
		};

		controllerFn.$inject = ['$location'];

		return ddo;

		function controllerFn($location) {
			var vm = this;
		}
	}
})();
