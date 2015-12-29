(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoOneToManyFactory', factoryFn);

    factoryFn.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseRulesFactory', 'firebaseService', 'routeParamsFactory', '$log'];

    function factoryFn($firebaseArray, $firebaseObject, firebaseRulesFactory, firebaseService, routeParamsFactory, $log) {

        function factory(oneConstant, manyConstant, feedback) {
            var oneRef = firebaseService.ref().child(oneConstant.dao);
            var manyRef = firebaseService.ref().child(manyConstant.dao);
            var keyRef;
            var doOff = false;

            var service = {
                add: function(object, callback) {
                    var oneKey = routeParamsFactory.getParam(oneConstant.dao);
                    var oneRefChild = oneRef.child(oneKey).child(manyConstant.dao);
                    var rulesFactory = firebaseRulesFactory(manyConstant, oneRefChild);

                    function add() {
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
                    }

                    function isWithinAddLimitCallback(isWithinAddLimit) {
                        if (isWithinAddLimit) {
                            add();
                        }
                    }

                    function isAddLimitCallback(isAddLimit) {
                        if (isAddLimit) {
                            rulesFactory.isWithinAddLimit(feedback, isWithinAddLimitCallback);
                        } else {
                            add();
                        }
                    }

                    function canAddCallback(canAdd) {
                        if (canAdd) {
                            rulesFactory.isAddLimit(feedback, isAddLimitCallback);
                        }
                    }

                    rulesFactory.canAdd(feedback, canAddCallback);
                },
                remove: function(key) {
                    var oneKey = routeParamsFactory.getParam(oneConstant.dao);
                    var ref = firebaseService.ref();
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
                syncArray: function(key, data) {
                    keyRef = oneRef
                        .child(key)
                        .child(manyConstant.dao);

                    var manyKeys = $firebaseArray(keyRef);

                    manyKeys.$watch(function(event) {
                        if (event.event === 'child_added') {
                            $firebaseObject(manyRef.child(event.key)).$loaded()
                                .then(function(obj) {
                                    data.push(obj);
                                }).catch(function(error) {
                                    $log.error(error);
                                    feedback.error('Error reading ' + oneConstant.title + ' & ' + manyConstant.title + '.');
                                });
                        }
                        if (event.event === 'child_removed') {
                            data.findIndex(function(obj, index, array) {
                                if (obj.$id === event.key) {
                                    array.splice(index, 1);
                                }
                            });
                        }
                    });
                }
            };
            return service;
        }
        return factory;
    }
})();
