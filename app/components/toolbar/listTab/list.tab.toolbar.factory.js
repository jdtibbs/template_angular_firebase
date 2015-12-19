(function() {

    'use strict';

    angular.module('components.module')
        .factory('listTabToolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory', '$location', '$log'];

    function factoryFn(sidenavFactory, $location, $log) {

        function factory(constants, editRouteFactory, listRouteFactory) {
            var components = {
                toolbar: {
                    title: {
                        text: constants.title
                    }
                },
                sidenav: {
                    service: sidenavFactory()
                },
                // menu: {
                // items: ['a', 'b']
                // },
                buttons: {
                    add: function() {
                        $location.path(listRouteFactory.addRoute());
                    },
                    cancel: function() {
                        $location.path(editRouteFactory.listRoute());
                    }
                }

            };
            return components;
        }
        return factory;
    }
})();
