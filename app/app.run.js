(function() {
    'use strict';

    angular.module('app')
        .run(runFn);

    runFn.$inject = ['$location', '$rootScope'];

    function runFn($location, $rootScope) {
        // TODO find way to not use $rootScope
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user to the login page.
            if (error === "AUTH_REQUIRED") {
                $location.path("/login");
            }
        });
    }
})();
