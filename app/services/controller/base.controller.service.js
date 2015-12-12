(function() {

    'use strict';

    angular.module('services.module')
        .service('baseControllerService', serviceFn);

    function serviceFn() {

        var service = {
            init: function(props, constants) {
                props.toolbar = {
                    title: {
                        text: constants.title
                    }
                };
            }
        };

        return service;
    }
})();
