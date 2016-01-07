(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseService', serviceFn);

    serviceFn.$inject = ['firebaseConstants', '$log'];

    function serviceFn(firebaseConstants, $log) {

        this.ref = ref;

        var _ref;

        function ref() {
            return _ref || (_ref = new Firebase(firebaseConstants.url()));
        }
    }
})();
