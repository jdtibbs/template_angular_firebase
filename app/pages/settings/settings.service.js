(function() {

	'use strict';

	angular.module('settings.module')
		.service('settingsService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'loginService', 'rx'];

	function serviceFn(firebaseUserService, $log, loginService, rx) {
		this.changeEmail = changeEmail;
		this.changePassword = changePassword;
		this.resetPassword = resetPassword;

		function changeEmail(currentEmail, newEmail, password, feedbackFactory) {
			feedbackFactory.init();
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.changeEmail(currentEmail, newEmail, password);
			});
			var subscription = source.subscribe(
				function(response) {
					loginService.logout();
				},
				function(error) {
					feedbackFactory.error(error);
				},
				function() {
					$log.debug('rx change email completed');
				});
		}

		function changePassword(email, oldPassword, newPassword, feedbackFactory, init) {
			feedbackFactory.init();
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.changePassword(email, oldPassword, newPassword);
			});
			var subscription = source.subscribe(
				function(response) {
					init();
					feedbackFactory.success('Password changed successfully.');
				},
				function(error) {
					feedbackFactory.error(error);
				},
				function() {
					$log.debug('rx change password completed');
				});
		}

		function resetPassword(email, feedbackFactory) {
			feedbackFactory.init();
			firebaseUserService.resetPassword(email);
		}
	}
})();
