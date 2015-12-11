(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHomeTitle', directiveDefinitionObject);

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/title/home/home.title.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}

	}
})();
