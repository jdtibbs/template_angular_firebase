(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtToolbarSearch', directiveFn);

	function directiveFn() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/toolbar/search/search.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
			vm.showClear = false;

			vm.change = function() {
				if (vm.props.toolbar.props.search.value) {
					vm.showClear = true;
				}
			};

			vm.clear = function() {
				vm.props.toolbar.props.search.value = '';
				vm.showClear = false;
			};
		}
	}
})();
