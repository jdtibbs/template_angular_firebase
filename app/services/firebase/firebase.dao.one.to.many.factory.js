(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoOneToManyFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$log', '$timeout'];

    function factoryFn(firebaseService, $log, $timeout) {

        function factory(oneConstant, manyConstant, feedback) {
            var oneRef = firebaseService.ref().child(oneConstant.dao);
            var manyRef = firebaseService.ref().child(manyConstant.dao);

            var service = {
                add: function(object, callback) {
                    // TODO
                },
                remove: function(object, callback) {
                    // TODO
                },
                save: function(object, callback) {
                    // TODO
                },
                syncArray: function(key, onAdd, onChange, onRemove) {
                    var keyRef = oneRef
                        .child(key)
                        .child(manyConstant.dao);

                    keyRef
                        .orderByKey()
                        .on('child_added',
                            function(snap) {
                                manyRef
                                    .child(snap.key())
                                    .once('value', onAdd, onError);
                            },
                            onError);

                    keyRef
                        .on('child_removed', onRemove, onError);

                    manyRef
                        .on('child_changed', onChange, onError);

                    function onError(error) {
                        $log.error(error);
                        feedback.error('Error reading ' + oneConstant.title + ' & ' + manyConstant.title + '.');
                    }
                }
            };
            return service;
        }
        return factory;
    }
})();
