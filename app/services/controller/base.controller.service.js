(function() {

    'use strict';

    angular.module('services.module')
        .service('baseControllerService', serviceFn);

    serviceFn.$inject = ['$log'];

    function serviceFn($log) {

        var service = {
            init: function(props, constants) {
                props.title = {
                    text: constants.title
                };
                props.toolbar.service.init();
            }
        };

        return service;
    }
})();
