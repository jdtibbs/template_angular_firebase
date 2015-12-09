(function() {

    'use strict';

    angular.module('services.module')
        .service('baseListControllerService', serviceFn);

    serviceFn.$inject = ['baseControllerService', '$location', '$log'];

    function serviceFn(baseControllerService, $location, $log) {

        var service = {
            init: function(props, constants, routeFactory) {
                baseControllerService.init(props, constants);
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
