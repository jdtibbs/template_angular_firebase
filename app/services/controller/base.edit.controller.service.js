(function() {

    'use strict';

    angular.module('services.module')
        .service('baseEditControllerService', serviceFn);

    serviceFn.$inject = ['baseControllerService', '$log'];

    function serviceFn(baseControllerService, $log) {

        var service = {
            init: function(props, constants, routeFactory) {
                baseControllerService.init(props, constants);

                props.button = {
                    cancel: {
                        route: routeFactory.cancelRoute()
                    }
                };
            }
        };

        return service;
    }
})();
