(function() {

    'use strict';

    angular.module('components.module')
        .service('menuDaoService', factoryFn);

    factoryFn.$inject = ['firebaseService', '$firebaseObject', '$log', 'menuConstants'];

    function factoryFn(firebaseService, $firebaseObject, $log, menuConstants) {
        this.add = add;
        this.destroy = destroy;
        this.get = get;
        this.ref = ref;
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
