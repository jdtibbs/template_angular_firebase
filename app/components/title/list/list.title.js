(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtListTitle', directiveDefinitionObject);

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/title/list/list.title.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}

	}
})();
