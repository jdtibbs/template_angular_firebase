(function() {

    'use strict';

    angular.module('services.firebase.module')
        .service('firebaseUserService', serviceFn);

    serviceFn.$inject = ['firebaseAuthService', '$log'];

    function serviceFn(firebaseAuthService, $log) {

        this.changeEmail = changeEmail;
        this.changePassword = changePassword;
        this.createUser = createUser;
        this.resetPassword = resetPassword;

        function changeEmail(oldEmail, newEmail, password) {
            return firebaseAuthService.authObj().$changeEmail({
                oldEmail: oldEmail,
                newEmail: newEmail,
                password: password
            });
        }

        function changePassword(email, oldPassword, newPassword) {
            return firebaseAuthService.authObj().$changePassword({
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
        }

        function createUser() {
            $log.debug('TODO createUser');
        }

        function resetPassword(email) {
            return firebaseAuthService.authObj().$resetPassword({
                email: email
            });
        }
    }
})();