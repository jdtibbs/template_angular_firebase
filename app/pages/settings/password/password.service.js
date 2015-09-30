(function() {

	'use strict';

	angular.module('settings.module')
		.service('passwordService', serviceFn);

	serviceFn.$inject = ['firebaseUserService', '$log', 'rx'];

	function serviceFn(firebaseUserService, $log, rx) {

		var service = {

			changePassword: function(email, oldPassword, newPassword, feedback, callback) {
				function async() {
					return firebaseUserService.changePassword(email, oldPassword, newPassword);
				}

				function onNext(response) {
					callback();
					feedback.success('Password changed successfully.');
				}

				function onError(error) {
					feedback.error(error);
				}

				function onComplete() {
					$log.debug('rx change password completed');
				}

				rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
			},

			resetPassword: function(email, feedback) {
				function async() {
					return firebaseUserService.resetPassword(email);
				}

				function onNext(response) {
					feedback.success('An email with directions to reset your password has been sent to you.');
				}

				function onError(error) {
					feedback.error(error);
				}

				function onComplete() {
					$log.debug('rx reset password completed');
				}

				rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
			}
		};

		return service;
	}
})();
