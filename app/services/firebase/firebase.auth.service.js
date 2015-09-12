(function() {

    'use strict';

    angular.module('services.firebase.module')
        .service('firebaseAuthService', serviceFn);

    serviceFn.$inject = ['firebaseService', '$firebaseAuth', '$log'];

    function serviceFn(firebaseService, $firebaseAuth, $log) {

        this.authData = authData;
        this.authObj = authObj;
        this.login = login;
        this.logout = logout;

        var _authObj;

        function authData() {
            return authObj().$getAuth();
        }

        function authObj() {
            return _authObj || (_authObj = $firebaseAuth(firebaseService.ref()));
        }

        function login(email, password) {
            return authObj().$authWithPassword({
                email: email,
                password: password
            });
        }

        function logout() {
            authObj().$unauth();
        }
    }
})();
