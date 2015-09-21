(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', '$location', '$log', 'passwordService', 'rx'];

	function serviceFn(firebaseAuthService, $location, $log, passwordService, rx) {
		this.authData = authData;
		this.authObj = authObj;
		this.resetPassword = resetPassword;
		this.login = login;
		this.logout = logout;
		this.onAuth = onAuth;
		this.requireAuth = requireAuth;

		function authData() {
			return firebaseAuthService.authData();
		}

		function authObj() {
			return firebaseAuthService.authObj();
		}

		function resetPassword(email, feedback) {
			passwordService.resetPassword(email, feedback);
		}

		function login(email, password, feedback) {
			var source = rx.Observable.startAsync(function() {
				return firebaseAuthService.login(email, password);
			});
			var subscription = source.subscribe(
				function(authData) {
					// see onAuth()
				},
				function(error) {
					feedback.error('Email or password is invalid.');
				},
				function() {
					$log.debug('rx completed');
				});
		}

		function logout() {
			return firebaseAuthService.logout();
		}

		function onAuth(setAuthData) {
			// handle changes in authentication state.
			authObj().$onAuth(function(authData) {
				if (setAuthData) {
					setAuthData(authData);
				}
				if (authData) {
					$log.debug("Logged in:", authData.uid);
					$location.path('/home');
				} else {
					$log.debug("Logged out (or login failed).");
					$location.path('/login');
				}
			});
		}

		function requireAuth() {
			return firebaseAuthService.requireAuth();
		}
	}
})();
