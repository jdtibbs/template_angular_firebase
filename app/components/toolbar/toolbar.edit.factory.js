(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarEditFactory', factoryFn);

    factoryFn.$inject = ['$location', 'sidenavFactory'];

    function factoryFn($location, sidenavFactory) {

        function factory(constants, routeFactory) {
            var components = {
                buttons: {
                    cancel: function() {
                        $location.path(routeFactory.listRoute());
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
                    isList: false,
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
