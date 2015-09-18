(function() {

	'use strict';

	angular.module('settings.module')
		.service('passwordService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'rx'];

	function serviceFn(firebaseUserService, $log, rx) {
		this.changePassword = changePassword;
		this.resetPassword = resetPassword;

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
			var source = rx.Observable.startAsync(function() {
				return firebaseUserService.resetPassword(email);
			});
			var subscription = source.subscribe(
				function(response) {
					feedbackFactory.success('An email with directions to reset your password has been sent to you.');
				},
				function(error) {
					feedbackFactory.error(error);
				},
				function() {
					$log.debug('rx reset password completed');
				});
		}
	}
})();
