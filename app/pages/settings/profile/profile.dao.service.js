(function() {

    'use strict';

    angular.module('settings.module')
        .service('profileDaoService', serviceFn);

    serviceFn.$inject = ['FirebaseFactory', 'profileConstants'];

    function serviceFn(FirebaseFactory, profileConstants) {
        var dao = new FirebaseFactory(profileConstants);

        this.add = dao.add;
        this.get = dao.get;
        this.save = dao.save;
    }
})();
