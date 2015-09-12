(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', '$log'];

	function serviceFn(firebaseAuthService, $log) {

		this.authData = authData;
		this.authObj = authObj;
		this.login = login;
		this.logout = logout;

		function authData() {
			return firebaseAuthService.authData();
		}

		function authObj() {
			return firebaseAuthService.authObj();
		}

		function login(email, password) {
			return firebaseAuthService.login(email, password);
		}

		function logout() {
			return firebaseAuthService.logout();
		}
	}
})();
