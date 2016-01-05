(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoFactory', factoryFn);

    factoryFn.$inject = ['firebaseDao'];

    function factoryFn(firebaseDao) {

        function factory(constant) {
            var objectDescriptor = {
                constant: {
                    value: constant
                }
            };
            return Object.create(firebaseDao, objectDescriptor);
        }
        return factory;
    }
})();
