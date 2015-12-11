(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSearchButton', directiveDefinitionObject);

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/buttons/search/search.button.html'
		};

		controllerFn.$inject = ['$log'];

		return ddo;

		function controllerFn($log) {
			var vm = this;
			vm.button = {
				search: function() {
					$log.info('TODO: search button.');
				}
			};
		}

	}
})();
