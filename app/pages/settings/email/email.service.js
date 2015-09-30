(function() {

	'use strict';

	angular.module('settings.module')
		.service('emailService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'loginService', 'rx'];

	function serviceFn(firebaseUserService, $log, loginService, rx) {

		var service = {

			changeEmail: function(currentEmail, newEmail, password, feedback) {
				function async() {
					return firebaseUserService.changeEmail(currentEmail, newEmail, password);
				}

				function onNext(response) {
					// force user to login with new email in order to update authData.
					loginService.logout();
				}

				function onError(error) {
					feedback.error(error);
				}

				function onComplete() {
					$log.debug('rx change email completed');
				}

				rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
			}
		};

		return service;
	}
})();
