(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoManyToOneFactory', factoryFn);

    factoryFn.$inject = ['firebaseDaoManyToOne'];

    function factoryFn(firebaseDaoManyToOne) {

        function factory(oneConstant, manyConstant) {
            var obj = Object.create(firebaseDaoManyToOne);
            obj.oneConstant = oneConstant;
            obj.manyConstant = manyConstant;
            return obj;
        }
        return factory;
    }
})();
