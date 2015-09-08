(function() {

    'use strict';

    angular.module('services.firebase.module')
        .service('firebaseService', serviceFn);

    serviceFn.$inject = ['firebaseConstants', '$log'];

    function serviceFn(firebaseConstants, $log) {

        this.ref = ref;

        function ref(path) {
            if (typeof path === 'string') {
                if (path.search(/\//) > -1) {
                    return new Firebase(firebaseConstants.url() + path);
                } else {
                    throw new Error('Path must start with /. path: ' + path);
                }
            } else {
                return new Firebase(firebaseConstants.url());
            }
        }
    }
})();
