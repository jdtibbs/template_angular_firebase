(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHome', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['$log', 'homeConstants'];

	function directiveDefinitionObject($log, homeConstants) {
		var ddo = {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/home/home.directive.html'
		};

		return ddo;

		function controllerFn() {
			var vm = this;
			vm.props.title = {
				text: homeConstants.title
			};
			vm.props.toolbar.service.init();
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
