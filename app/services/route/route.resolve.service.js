(function() {

    'use strict';

    angular.module('route.resolve.module')
        .service('routeResolveService', serviceFn);

    serviceFn.$inject = ['firebaseAuthService', 'permissionService', '$q', '$log'];

    function serviceFn(firebaseAuthService, permissionService, $q, $log) {
        this.getAuth = getAuth;

        function getAuth(permission) {
            var def = $q.defer();
            firebaseAuthService.requireAuth()
                .then(function(auth) {
                    permissionService.hasPermission(permission)
                        .then(function(has) {
                            if (has) {
                                def.resolve(auth);
                            } else {
                                def.reject('Access denied: permissions.');
                            }
                        })
                        .catch(function(error) {
                            $log.debug(error);
                            def.reject(error);
                        });
                })
                .catch(function(error) {
                    $log.debug(error);
                    def.reject(error);
                });
            return def.promise;
        }
    }
})();
