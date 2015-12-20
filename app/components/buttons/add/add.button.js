(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtAddButton', directiveDefinitionObject);


	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/buttons/add/add.button.html'
		};

		controllerFn.$inject = ['$location'];

		return ddo;

		function controllerFn($location) {
			var vm = this;
			vm.button = {
				add: function() {
					$location.path(vm.props.button.add.route);
				}
			};
		}

	}
})();
