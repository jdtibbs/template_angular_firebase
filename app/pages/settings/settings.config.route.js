(function() {

    'use strict';
    angular.module('settings.module')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'app/pages/settings/settings.html',
            resolve: {
                requireAuth: requireAuth
            }
        });
    }

    requireAuth.$inject = ['loginService'];

    function requireAuth(loginService) {
        return loginService.requireAuth();
    }

})();
