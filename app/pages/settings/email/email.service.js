(function() {

	'use strict';

	angular.module('settings.module')
		.service('emailService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'loginService', 'rx'];

	function serviceFn(firebaseUserService, $log, loginService, rx) {
		this.changeEmail = changeEmail;

		function changeEmail(currentEmail, newEmail, password, feedbackFactory) {
			feedbackFactory.init();
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.changeEmail(currentEmail, newEmail, password);
			});
			var subscription = source.subscribe(
				function(response) {
					// force user to login with new email in order to update authData.
					loginService.logout();
				},
				function(error) {
					feedbackFactory.error(error);
				},
				function() {
					$log.debug('rx change email completed');
				});
		}
	}
})();
