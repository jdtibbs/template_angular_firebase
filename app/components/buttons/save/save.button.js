(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtSaveButton', directiveDefinitionObject);


	function directiveDefinitionObject() {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkfn,
			require: '^form',
			templateUrl: 'app/components/buttons/save/save.button.html'
		};

		controllerFn.$inject = ['$log'];

		return ddo;

		function controllerFn($log) {
			var vm = this;
			vm.button = {
				save: function() {
					$log.info('TODO: save button');
				}
			};
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
