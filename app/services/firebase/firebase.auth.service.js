(function() {

    'use strict';

    angular.module('services.firebase.module')
        .service('firebaseAuthService', serviceFn);

    serviceFn.$inject = ['firebaseService', '$firebaseAuth', '$log'];

    function serviceFn(firebaseService, $firebaseAuth, $log) {

        var authObj;

        this.login = login;
        this.logout = logout;

        function getAuthObj() {
            return authObj || (authObj = $firebaseAuth(firebaseService.ref()));
        }


        function login(email, password) {
            return getAuthObj().$authWithPassword({
                email: email,
                password: password
            });
        }

        function logout() {
            getAuthObj().$unauth();
        }
    }
})();
