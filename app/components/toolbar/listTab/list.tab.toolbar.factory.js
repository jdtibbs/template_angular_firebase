(function() {

    'use strict';

    angular.module('components.module')
        .factory('listTabToolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory', '$location'];

    function factoryFn(sidenavFactory, $location) {

        function factory(constants, editRouteFactory, listRouteFactory) {
            var components = {
                toolbar: {
                    title: {
                        text: constants.title
                    },
                    search: {
                        value: ''
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
