(function() {

    'use strict';
    angular.module('settings.module')
        .config(config);
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'app/pages/settings/settings.html'
                // resolve: {
                // waitForAuth: waitForAuth
                // }
        });
    }

    // waitForAuth.$inject = ['firebaseFactory'];

    // function waitForAuth(firebaseFactory) {
    //     return firebaseFactory.auth().$waitForAuth();
    // }

})();
