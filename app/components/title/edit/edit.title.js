(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtEditTitle', directiveDefinitionObject);

	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'app/components/title/edit/edit.title.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
			vm.button = {
				cancel: function() {
					$location.path(vm.props.button.cancel.route);
				}
			};
		}

	}
})();
