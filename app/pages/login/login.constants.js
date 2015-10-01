(function() {
	'use strict';

	angular.module('login.module')
		.constant('LOGIN_TITLE', 'Login')
		.provider('loginConstants', providerFn);

	providerFn.$inject = ['LOGIN_TITLE'];

	function providerFn(LOGIN_TITLE) {

		return {
			$get: function() {
				return {
					title: LOGIN_TITLE
				};
			}
		};
	}
})();
