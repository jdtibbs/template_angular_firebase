(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoOneToManyFactory', factoryFn);

    factoryFn.$inject = ['firebaseDaoOneToMany'];

    function factoryFn(firebaseDaoOneToMany) {

        function factory(constant, manyConstant) {
            var objectDescriptor = {
                constant: {
                    value: constant
                },
                manyConstant: {
                    value: manyConstant
                }
            };

            return Object.create(firebaseDaoOneToMany, objectDescriptor);
        }
        return factory;
    }
})();
