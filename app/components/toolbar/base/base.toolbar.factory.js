(function() {

    'use strict';

    angular.module('components.module')
        .factory('baseToolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory', '$log'];

    function factoryFn(sidenavFactory, $log) {

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
