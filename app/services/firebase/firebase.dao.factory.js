(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoFactory', factoryFn);

    factoryFn.$inject = ['firebaseDao'];

    function factoryFn(firebaseDao) {

        function factory(constant) {
            var dao = Object.create(firebaseDao);
            dao.constant = constant;
            return dao;
        }
        return factory;
    }
})();
