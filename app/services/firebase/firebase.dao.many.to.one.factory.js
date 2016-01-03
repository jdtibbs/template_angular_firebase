(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoManyToOneFactory', factoryFn);

    factoryFn.$inject = ['firebaseDaoManyToOne'];

    function factoryFn(firebaseDaoManyToOne) {

        function factory(constant, oneConstant) {
            var objectDescriptor = {
                constant: {
                    value: constant
                },
                oneConstant: {
                    value: oneConstant
                }
            };

            // return Object.create(firebaseDaoManyToOne, objectDescriptor);
            var obj = Object.create(firebaseDaoManyToOne, objectDescriptor);
            console.log(obj);
            return obj;
        }
        return factory;
    }
})();
