(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtEmailValidate', directiveFn);

	directiveFn.$inject = ['$log'];

	function directiveFn($log) {
		return {
			restrict: 'A',
			link: linkFn,
			require: ['^form', 'ngModel']
		};


		function linkFn(scope, elem, attrs, ctrl) {
			ctrl[1].$validators.match = function(modelValue, viewValue) {
				if (ctrl[1].$isEmpty(modelValue)) {
					return true;
				}
				if (ctrl[0].email.$viewValue === ctrl[0].confirm.$viewValue) {
					// TODO find a better way where we do not specify the element names 'email' and 'confirm'.
					return true;
				}
				return false;
			};
		}
	}
})();
