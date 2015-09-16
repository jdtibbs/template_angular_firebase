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
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.changeEmail(oldEmail, newEmail, password);
			});
			var subscription = source.subscribe(
				function(response) {
					$log.debug('changeEmail response:');
					$log.debug(response);
					feedbackFactory.success('Email changed successfully.');
				},
				function(error) {
					feedbackFactory.error(error);
				},
				function() {
					$log.debug('rx change email completed');
				});
		}

		function changePassword(email, oldPassword, newPassword, feedbackFactory, init) {
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.changePassword(email, oldPassword, newPassword);
			});
			var subscription = source.subscribe(
				function(response) {
					$log.debug('changePassword response:');
					$log.debug(response);
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
			firebaseUserService.resetPassword(email);
		}
	}
})();
