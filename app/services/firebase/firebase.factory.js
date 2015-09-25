(function() {

    'use strict';

    angular.module('services.module')
        .factory('FirebaseFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseArray', '$firebaseObject', '$log'];

    function factoryFn(firebaseService, $firebaseArray, $firebaseObject, $log) {

        var factory = {};
        var _ref;
        var _onChildAdded = [];
        var _onValue = [];

        function firebaseFactory(constant) {
            factory.constant = constant; // private.
            this.add = add;
            this.destroy = destroy;
            this.get = get;
            this.onChildAdded = onChildAdded;
            this.onValue = onValue;
            this.ref = ref;
            this.save = save;
            this.syncArray = syncArray;
            this.syncObject = syncObject;
        }

        return firebaseFactory;


        function add(object) {
            return ref().$add(object);
        }

        function destroy() {
            offChildAdded();
            offValue();
        }

        function get(key) {
            return $firebaseObject(ref().child(key));
        }

        function onChildAdded(ref, callback) {
            _onChildAdded.push(callback);
            ref.on('child_added', callback);
        }

        function offChildAdded(ref) {
            // Detaches callbacks previously attached with on().
            _onChildAdded.map(function(value) {
                ref.off('child_added', value);
            });
        }

        function onValue(ref, callback) {
            _onValue.push(callback);
            ref.on('value', callback);
        }

        function offValue(ref) {
            // Detaches callbacks previously attached with on().
            _onValue.map(function(value) {
                ref.off('value', value);
            });
        }

        function ref() {
            return _ref || (_ref = firebaseService.ref().child(factory.constant.dao()));
        }

        function save(object) {
            return object.$save();
        }

        function syncArray(ref) {
            return $firebaseArray(ref);
        }

        function syncObject(ref) {
            return $firebaseObject(ref);
        }

    }
})();
