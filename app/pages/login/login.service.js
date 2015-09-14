(function() {

	'use strict';

	angular.module('login.module')
		.service('loginService', serviceFn);

	serviceFn.$inject = ['firebaseAuthService', '$location', '$log', 'rx'];

	function serviceFn(firebaseAuthService, $location, $log, rx) {
		var offOnAuth;

		this.authData = authData;
		this.authObj = authObj;
		this.forgot = forgot;
		this.login = login;
		this.logout = logout;

		function authData() {
			return firebaseAuthService.authData();
		}

		function authObj() {
			return firebaseAuthService.authObj();
		}

		function forgot(feedback) {
			// TODO finish this.
			feedback.success('An email with directions to reset your password has been sent to you.');
		}

		function login(email, password, setAuthData, feedback) {
			onAuth(setAuthData);
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
			if (offOnAuth) {
				offOnAuth(); // unregister previous.
			}
			offOnAuth = authObj().$onAuth(function(authData) {
				setAuthData(authData);
				if (authData) {
					$log.debug("Logged in:", authData.uid);
					$location.path('/home');
				} else {
					$log.debug("Logged out (or login failed).");
					$location.path('/login');
				}
			});
		}
	}
})();
