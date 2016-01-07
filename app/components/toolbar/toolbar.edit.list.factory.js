(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarEditListFactory', factoryFn);

    factoryFn.$inject = ['$location', 'sidenavFactory'];

    function factoryFn($location, sidenavFactory) {

        function factory(constants, editRouteFactory, listRouteFactory) {
            var components = {
                buttons: {
                    add: function() {
                        $location.path(listRouteFactory.addRoute());
                    },
                    cancel: function() {
                        $location.path(editRouteFactory.listRoute());
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
                    isEdit: true,
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
