(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseUserService', serviceFn);

    serviceFn.$inject = ['firebaseAuthService', '$log'];

    function serviceFn(firebaseAuthService, $log) {

        var service = {
            changeEmail: function(oldEmail, newEmail, password) {
                return firebaseAuthService.authObj().$changeEmail({
                    oldEmail: oldEmail,
                    newEmail: newEmail,
                    password: password
                });
            },

            changePassword: function(email, oldPassword, newPassword) {
                return firebaseAuthService.authObj().$changePassword({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                });
            },

            createUser: function() {
                $log.debug('TODO createUser');
            },

            resetPassword: function(email) {
                return firebaseAuthService.authObj().$resetPassword({
                    email: email
                });
            }
        };

        return service;
    }
})();
