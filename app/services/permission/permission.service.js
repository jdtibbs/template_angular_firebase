(function() {

    'use strict';

    angular.module('services.module')
        .service('permissionService', serviceFn);

    serviceFn.$inject = ['loginService', '$log', 'roleService', 'rx'];

    function serviceFn(loginService, $log, roleService, rx) {
        this.hasPermission = hasPermission;

        function hasPermission() {
            if (roleService.hasPermission()) {
                return ture;
            } else if (permission()) {
                return true;
            } else {
                return false;
            }
        }

        function permission() {
            return true;
        }
    }
})();
