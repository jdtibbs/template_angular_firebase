(function() {

    'use strict';

    angular.module('services.module')
        .service('roleService', serviceFn);

    serviceFn.$inject = ['$log', 'rx'];

    function serviceFn($log, rx) {

        // TODO, implement roles.
        var service = {
            hasRole: function() {
                return true;
            }
        };
        return service;
    }
})();
