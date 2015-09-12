(function() {
	'use strict';

	angular.module('components.module')
		.directive('jdtMenuDrawer', directiveFn);

	directiveFn.$inject = ['loginService', '$location', '$log'];

	function directiveFn(loginService, $location, $log) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/components/menuDrawer/menu.drawer.directive.html'
		};

		function controllerFn() {
			var vm = this;

		}

		function linkFn(scope, elem, attrs) {
			// init();

			// function init() {
			// 	var off = scope.$on('$locationChangeStart', locationChangeStartFn);

			// 	function locationChangeStartFn(event, newUrl) {
			// 		// hide drawer
			// 		angular.element(elem[0].querySelector('.mdl-layout__drawer')).removeClass("is-visible");
			// 	}

			// 	scope.$on('$destroy', function() {
			// 		off();
			// 	});
			// }
			$log.debug(elem[0]);
			componentHandler.upgradeElement(elem[0]);
		}
	}
})();
