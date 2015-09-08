(function() {

    'use strict';

    angular.module('services.firebase.module')
        .service('firebaseAuthService', serviceFn);

    serviceFn.$inject = ['firebaseService', '$firebaseAuth', '$log', '$location'];

    function serviceFn(firebaseService, $firebaseAuth, $log, $location) {

        var authObj;

        this.login = login;
        this.logout = logout;

        function getAuthObj() {
            if (authObj) {
                return authObj;
            } else {
                authObj = $firebaseAuth(firebaseService.ref());
                // TODO: move $location.path somewhere better? 
                authObj.$onAuth(function(authData) {
                    if (authData) {
                        $log.debug("Logged in:", authData.uid);
                        $location.path('/home');
                    } else {
                        $log.debug("Logged out.");
                        $location.path('/login');
                    }
                });
                return authObj;
            }
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
