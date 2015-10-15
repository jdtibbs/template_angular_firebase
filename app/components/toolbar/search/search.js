(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSearch', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['$log'];

	function directiveDefinitionObject($log) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/toolbar/search/search.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
