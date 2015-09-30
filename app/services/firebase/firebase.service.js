(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseService', FirebaseService);

    FirebaseService.$inject = ['firebaseConstants', '$log'];

    function FirebaseService(firebaseConstants, $log) {
        var _ref;

        this.ref = function() {
            return _ref || (_ref = new Firebase(firebaseConstants.url()));
        };
    }
})();
