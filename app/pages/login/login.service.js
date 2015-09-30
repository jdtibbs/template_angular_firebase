(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', '$location', '$log', 'passwordService', 'rx'];

	function serviceFn(firebaseAuthService, $location, $log, passwordService, rx) {

		var service = {

			authData: function() {
				return firebaseAuthService.authData();
			},

			authObj: function() {
				return firebaseAuthService.authObj();
			},

			resetPassword: function(email, feedback) {
				passwordService.resetPassword(email, feedback);
			},

			login: function(email, password, feedback) {
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
			},

			logout: function() {
				return firebaseAuthService.logout();
			},

			onAuth: function(setAuthData) {
				// handle changes in authentication state.
				this.authObj().$onAuth(function(authData) {
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
			},

			requireAuth: function() {
				return firebaseAuthService.requireAuth();
			}
		};

		return service;
	}
})();
