(function() {

    'use strict';

    angular.module('login.module')
        .service('loginService', serviceFn);

    serviceFn.$inject = ['$log'];

    function serviceFn($log) {

        this.login = function(email, password, props) {
            $log.debug(email);
            $log.debug(password);
        };
    }
})();
