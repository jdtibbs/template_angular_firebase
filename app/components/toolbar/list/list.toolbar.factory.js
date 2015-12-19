(function() {

    'use strict';

    angular.module('components.module')
        .factory('listToolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory', '$location', '$log'];

    function factoryFn(sidenavFactory, $location, $log) {

        function factory(constants, routeFactory) {
            var components = {
                toolbar: {
                    title: {
                        text: constants.title
                    }
                },
                sidenav: {
                    service: sidenavFactory()
                },
                menu: {
                    items: ['a', 'b']
                },
                buttons: {
                    add: function() {
                        $location.path(routeFactory.addRoute());
                    }
                }
            };
            return components;
        }
        return factory;
    }
})();
