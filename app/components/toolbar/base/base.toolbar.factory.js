(function() {

    'use strict';

    angular.module('components.module')
        .factory('baseToolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory'];

    function factoryFn(sidenavFactory) {

        function factory(constants) {
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
                }
            };
            return components;
        }
        return factory;
    }
})();
