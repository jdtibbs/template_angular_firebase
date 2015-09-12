(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', '$log'];

	function serviceFn(firebaseAuthService, $log) {

		this.authData = function() {
			return firebaseAuthService.authData();
		};

		this.authObj = function() {
			return firebaseAuthService.authObj();
		};

		this.login = function(email, password) {
			return firebaseAuthService.login(email, password);
		};

		this.logout = function() {
			return firebaseAuthService.logout();
		};
	}
})();
