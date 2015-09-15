(function() {

	'use strict';

	angular.module('settings.module')
		.service('settingsService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'rx'];

	function serviceFn(firebaseUserService, $log, rx) {
		this.changeEmail = changeEmail;
		this.changePassword = changePassword;
		this.resetPassword = resetPassword;

		function changeEmail(oldEmail, newEmail, password, feedbackFactory) {
			firebaseUserService.changeEmail(oldEmail, newEmail, password);
		}

		function changePassword(email, oldPassword, newPassword, feedbackFactory) {
			firebaseUserService.changePassword(email, oldPassword, newPassword);
		}

		function resetPassword(email, feedbackFactory) {
			firebaseUserService.resetPassword(email);
		}
	}
})();
