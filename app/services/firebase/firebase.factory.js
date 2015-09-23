(function() {

    'use strict';

    angular.module('services.module')
        .factory('FirebaseFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseArray', '$firebaseObject', '$log'];

    function factoryFn(firebaseService, $firebaseArray, $firebaseObject, $log) {

        function factory(constant) {
            var onChildAdded = [];

            function offChildAdded(ref) {
                // Detaches callbacks previously attached with on().
                onChildAdded.map(function(value) {
                    ref.off('child_added', value);
                });
            }

            function ref() {
                return firebaseService.ref().child(constant.dao());
            }

            function syncArray(key) {
                return $firebaseArray(ref());
            }

            function syncObject(key) {
                return $firebaseObject(ref().child(uid));
            }
        }

        return factory;
    }
})();
