(function() {

    'use strict';

    angular.module('permission.module')
        .service('permissionService', serviceFn);

    serviceFn.$inject = ['$q', '$log'];

    function serviceFn($q, $log) {
        this.hasPermission = hasPermission;

        function hasPermission() {
            return true;
        }
    }
})();
