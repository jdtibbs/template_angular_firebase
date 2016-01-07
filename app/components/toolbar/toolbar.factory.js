(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarFactory', factoryFn);

    factoryFn.$inject = ['sidenavFactory'];

    function factoryFn(sidenavFactory) {

        function factory(constants) {
            var components = {
                menu: {
                    items: ['a', 'b']
                },
                sidenav: {
                    service: sidenavFactory()
                },
                toolbar: {
                    isBase: true,
                    isEdit: false,
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
