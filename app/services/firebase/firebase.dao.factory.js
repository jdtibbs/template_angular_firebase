(function() {

    'use strict';

    angular.module('services.module')
        .factory('FirebaseDaoFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseArray', '$firebaseObject', '$log'];

    function factoryFn(firebaseService, $firebaseArray, $firebaseObject, $log) {

        function FirebaseDaoFactory(constant) {
            this.constant = constant;
        }

        FirebaseDaoFactory.prototype = {
            constructor: FirebaseDaoFactory,
            add: function(object) {
                return ref().$add(object);
            },
            ref: function() {
                return firebaseService.ref().child(this.constant.dao());
            },
            save: function(object) {
                return object.$save();
            },
            syncArray: function(ref) {
                return $firebaseArray(ref);
            },
            syncObject: function(ref) {
                return $firebaseObject(ref);
            }
        };

        return FirebaseDaoFactory;
    }
})();
