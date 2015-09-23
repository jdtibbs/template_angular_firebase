(function() {

    'use strict';

    angular.module('services.module')
        .service('permissionService', serviceFn);

    serviceFn.$inject = ['loginService', '$log', 'roleService', 'rx'];

    function serviceFn(loginService, $log, roleService, rx) {
        this.hasPermission = hasPermission;

        // TODO: idea... use firebase read rule to determine if user can access given route.
        // see: https://www.firebase.com/docs/security/guide/securing-data.html#section-other-paths
        // route:{read: root.child('') ... }
        function hasPermission(route) {
            // get permissions required for access to the given route/page.

            if (has()) {
                // user can be given specific permissions.
                return true;
            } else if (roleService.hasPermission()) {
                // user can be given multiple roles, roles can be given multiple permissions.
                return true;
            } else {
                // user is not permitted to access the specified page.
                return false;
            }
        }

        function has() {
            return true;
        }
    }
})();
