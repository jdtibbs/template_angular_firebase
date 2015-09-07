(function() {

    'use strict';
    angular.module('home.module')
        .config(config);
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: 'app/pages/home/home.html'
                    // resolve: {
                    // waitForAuth: waitForAuth
                    // }
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    // waitForAuth.$inject = ['firebaseFactory'];

    // function waitForAuth(firebaseFactory) {
    //     return firebaseFactory.auth().$waitForAuth();
    // }

})();
