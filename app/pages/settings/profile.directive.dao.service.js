(function() {

    'use strict';

    angular.module('settings.module')
        .service('profileDaoService', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseObject', '$log', 'profileConstants'];

    function factoryFn(firebaseService, $firebaseObject, $log, profileConstants) {
        this.ref = ref;
        this.get = get;
        this.add = add;
        this.save = save;

        var callBacks = [];

        function add(obj) {
            return ref().$add(obj);
        }

        function destroy() {
            firebaseFactory.offOnChildAdded(callBacks);
        }

        function get(id) {
            return $firebaseObject(ref().child(id));
        }

        function ref() {
            return firebaseService.ref().child(profileConstants.dao());
        }

        function save(obj) {
            return obj.$save();
        }

    }
})();
