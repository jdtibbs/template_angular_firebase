(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseAuthService', serviceFn);

    serviceFn.$inject = ['firebaseService', '$firebaseAuth', '$log'];

    function serviceFn(firebaseService, $firebaseAuth, $log) {

        var privateCount = 0;

        function privateMethod() {
            return 'i am a private method';
        }

        // call these methods via loginService! 

        var service = {
            authData: function() {
                return this.authObj().$getAuth();
            },

            authObj: function() {
                return $firebaseAuth(firebaseService.ref());
            },

            login: function(email, password) {
                return this.authObj().$authWithPassword({
                    email: email,
                    password: password
                });
            },

            logout: function() {
                this.authObj().$unauth();
            },

            requireAuth: function() {
                // $log.debug(privateMethod());
                // $log.debug(privateCount++);
                return this.authObj().$requireAuth();
            },
        };

        return service;
    }
})();
