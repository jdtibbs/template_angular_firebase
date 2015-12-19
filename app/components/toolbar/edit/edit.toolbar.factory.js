(function() {

    'use strict';

    angular.module('components.module')
        .factory('editToolbarFactory', factoryFn);

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
                    cancel: function() {
                        $location.path(routeFactory.listRoute());
                    }
                }
            };
            return components;
        }
        return factory;
    }
})();
