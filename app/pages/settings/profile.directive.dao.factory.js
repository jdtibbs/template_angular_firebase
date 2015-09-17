(function() {

    'use strict';

    angular.module('settings.module')
        .factory('profileDaoFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseObject', '$log', 'profileConstants'];

    function factoryFn(firebaseService, $firebaseObject, $log, profileConstants) {
        var callBacks = [];

        var factory = {
            ref: function() {
                return firebaseService.ref().child(profileConstants.dao());
            },
            syncObject: function(id) {
                return $firebaseObject(factory.ref().child(id));
            },
            add: function(obj) {
                return factory.ref().$add(obj);
            },
            save: function(obj) {
                return obj.$save();
            },
            destroy: destroy
        };

        return factory;

        function destroy() {
            firebaseFactory.offOnChildAdded(callBacks);
        }
    }
})();
