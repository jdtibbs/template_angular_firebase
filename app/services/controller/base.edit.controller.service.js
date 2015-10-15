(function() {

    'use strict';

    angular.module('services.module')
        .service('baseEditControllerService', serviceFn);

    serviceFn.$inject = ['baseControllerService', '$log'];

    function serviceFn(baseControllerService, $log) {

        var service = {
            init: function(props, constants, cancel) {
                baseControllerService.init(props, constants);

                props.title.back = {
                    action: cancel,
                    show: true
                };
            }
        };

        return service;
    }
})();
