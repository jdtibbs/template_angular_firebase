(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtHome', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['homeConstants', 'toolbarFactory'];

	function directiveDefinitionObject(homeConstants, toolbarFactory) {
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
			var toolbar = toolbarFactory(vm.props);
			toolbar.init();
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
