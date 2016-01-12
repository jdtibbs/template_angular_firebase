(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseUserService', serviceFn);

    serviceFn.$inject = ['firebaseAuthService', '$log', '$q'];

    function serviceFn(firebaseAuthService, $log, $q) {

        // TODO, remove restriction on changes when in demo mode.

        var def = $q.defer();
        def.resolve(true);

        var service = {
            changeEmail: function(oldEmail, newEmail, password) {
                // return firebaseAuthService.authObj().$changeEmail({
                //     oldEmail: oldEmail,
                //     newEmail: newEmail,
                //     password: password
                // });
                return def.promise;
            },

            changePassword: function(email, oldPassword, newPassword) {
                // return firebaseAuthService.authObj().$changePassword({
                //     email: email,
                //     oldPassword: oldPassword,
                //     newPassword: newPassword
                // });
                return def.promise;
            },

            createUser: function() {
                $log.debug('TODO createUser');
            },

            resetPassword: function(email) {
                // return firebaseAuthService.authObj().$resetPassword({
                //     email: email
                // });
                return def.promise;
            }
        };

        return service;
    }
})();
