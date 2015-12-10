(function() {

    'use strict';

    angular.module('services.module')
        .service('baseTabEditControllerService', serviceFn);

    serviceFn.$inject = ['$location', '$log'];

    function serviceFn($location, $log) {

        var service = {
            init: function(props) {
                props.toolbar.service.add.hideButton();
                props.toolbar.service.add.action = null;
                props.toolbar.service.search.hideButton();
            }
        };

        return service;
    }
})();
