(function() {

    'use strict';

    angular.module('services.module')
        .service('roleService', serviceFn);

    serviceFn.$inject = ['$log', 'rx'];

    function serviceFn($log, rx) {
        this.hasRole = hasRole;

        function hasRole() {
            return true;
        }
    }
})();
