(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarListFactory', factoryFn);

    factoryFn.$inject = ['$location', 'sidenavFactory'];

    function factoryFn($location, sidenavFactory) {

        function factory(constants, routeFactory) {
            var components = {
                buttons: {
                    add: function() {
                        $location.path(routeFactory.addRoute());
                    }
                },
                menu: {
                    items: ['a', 'b']
                },
                sidenav: {
                    service: sidenavFactory()
                },
                toolbar: {
                    isBase: false,
                    isEdit: false,
                    isList: true,
                    search: {
                        value: ''
                    },
                    title: {
                        text: constants.title
                    }
                }
            };
            return components;
        }
        return factory;
    }
})();
