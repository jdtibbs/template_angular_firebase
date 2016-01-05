(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', 'firebaseService', '$log', 'passwordService', 'rx'];

	function serviceFn(firebaseAuthService, firebaseService, $log, passwordService, rx) {

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
						var data = {
							time: new Date().toUTCString()
						};
						firebaseService.ref().child('login').child(authData.uid).set(data, function(error) {
							if (error) {
								$log.error(error);
							}
						});
					},
					function(error) {
						feedback.error('Email or password is invalid.');
					});
			},

			logout: function() {
				return firebaseAuthService.logout();
			},

			onAuth: function(callback) {
				// monitor and handle changes in authentication state.
				this.authObj().$onAuth(function(authData) {
					callback(authData);
				});
			},

			requireAuth: function() {
				return firebaseAuthService.requireAuth();
			}
		};

		return service;
	}
})();
