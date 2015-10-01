(function() {
	'use strict';

	angular.module('components.module')
		.constant('APP_NAME', 'Jdt App')
		.directive('jdtAppName', directiveDefinitionObject);

	directiveDefinitionObject.$inject = ['APP_NAME'];

	function directiveDefinitionObject(APP_NAME) {
		var ddo = {
			restrict: 'AE',
			link: linkFn
		};

		return ddo;

		function linkFn(scope, elem, attrs) {
			elem.text(APP_NAME);
		}
	}
})();
