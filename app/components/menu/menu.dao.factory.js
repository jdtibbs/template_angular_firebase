(function() {

    'use strict';

    angular.module('components.module')
        .factory('menuDaoService', factoryFn);

    factoryFn.$inject = ['firebaseDaoFactory', 'menuConstants'];

    function factoryFn(firebaseDaoFactory, menuConstants) {
        return firebaseDaoFactory(menuConstants);
    }
})();
