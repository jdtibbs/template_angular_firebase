(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoOneToManyFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', 'routeParamsFactory', '$log', '$timeout'];

    function factoryFn(firebaseService, routeParamsFactory, $log, $timeout) {

        function factory(oneConstant, manyConstant, feedback) {
            var oneRef = firebaseService.ref().child(oneConstant.dao);
            var manyRef = firebaseService.ref().child(manyConstant.dao);


            var service = {
                add: function(object, callback) {
                    var oneKey = routeParamsFactory.getParam(oneConstant.dao);
                    var ref = firebaseService.ref();
                    var newRef = ref.child(manyConstant.dao).push();
                    var newKey = newRef.key();
                    var newData = {};
                    newData[oneConstant.dao + '/' + oneKey + '/' + manyConstant.dao + '/' + newKey] = true;
                    newData[manyConstant.dao + '/' + newKey] = object;
                    ref.update(newData, onComplete);

                    function onComplete(error) {
                        if (error) {
                            $log.error(error);
                            feedback.error('Error writing ' + manyConstant.title + '.');
                        } else {
                            feedback.success(manyConstant.title + ' saved successfully.');
                            callback(newKey);
                        }
                    }
                },
                remove: function(key) {
                    var oneKey = routeParamsFactory.getParam(oneConstant.dao);
                    var ref = firebaseService.ref();
                    var newRef = ref.child(manyConstant.dao).push();
                    var newData = {};
                    newData[oneConstant.dao + '/' + oneKey + '/' + manyConstant.dao + '/' + key] = null;
                    newData[manyConstant.dao + '/' + key] = null;
                    ref.update(newData, onComplete);

                    function onComplete(error) {
                        if (error) {
                            $log.error(error);
                            feedback.error('Error deleting ' + manyConstant.title + '.');
                        } else {
                            feedback.success(manyConstant.title + ' deleted successfully.');
                        }
                    }
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
