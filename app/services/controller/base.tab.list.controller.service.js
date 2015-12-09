(function() {

    'use strict';

    angular.module('services.module')
        .service('baseTabListControllerService', serviceFn);

    serviceFn.$inject = ['$location', '$log'];

    function serviceFn($location, $log) {

        var service = {
            init: function(props, constants, routeFactory) {
                props.toolbar.service.add.showButton();
                props.toolbar.service.add.action = function() {
                    $location.path(routeFactory.addRoute());
                };
                props.toolbar.service.search.showButton();

            }
        };

        return service;
    }
})();
