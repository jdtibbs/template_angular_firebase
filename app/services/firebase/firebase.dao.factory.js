(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoFactory', factoryFn);

    factoryFn.$inject = ['firebaseDaoService', 'firebaseService', '$log'];

    function factoryFn(firebaseDaoService, firebaseService, $log) {

        function factory(constant) {
            var propertiesObj = {
                constant: {
                    value: constant
                },
                ref: {
                    value: firebaseService.ref().child(constant.dao())
                }
            };
            return Object.create(firebaseDaoService, propertiesObj);
        }

        return factory;
    }
})();
