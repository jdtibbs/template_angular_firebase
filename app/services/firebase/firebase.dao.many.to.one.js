(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoManyToOne', factoryFn);

    factoryFn.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDaoFactory', 'firebaseRulesFactory', 'firebaseService', 'routeParamsFactory', '$log'];

    function factoryFn($firebaseArray, $firebaseObject, firebaseDaoFactory, firebaseRulesFactory, firebaseService, routeParamsFactory, $log) {

        var add = function(object, callback, feedback) {
            var oneKey = routeParamsFactory.getParam(this.oneConstant.dao);
            var oneRefChild = this.oneRef().child(oneKey).child(this.manyConstant.dao);
            var rulesFactory = firebaseRulesFactory(this.manyConstant, oneRefChild);

            var add = function() {
                var ref = firebaseService.ref();
                var newRef = ref.child(this.manyConstant.dao).push();
                var newKey = newRef.key();
                var newData = {};

                newData[this.oneConstant.dao + '/' + oneKey + '/' + this.manyConstant.dao + '/' + newKey] = true;
                newData[this.manyConstant.dao + '/' + newKey] = object;

                var onComplete = function(error) {
                    if (error) {
                        $log.error(error);
                        feedback.error('Error writing ' + this.manyConstant.title + '.');
                    } else {
                        feedback.success(this.manyConstant.title + ' saved successfully.');
                        callback(newKey);
                    }
                }.bind(this);

                ref.update(newData, onComplete);
            }.bind(this);

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
        };

        var manyRef = function() {
            return firebaseService.ref().child(this.manyConstant.dao);
        };

        var oneRef = function() {
            return firebaseService.ref().child(this.oneConstant.dao);
        };

        var remove = function(key, feedback) {
            var oneKey = routeParamsFactory.getParam(this.oneConstant.dao);
            var ref = firebaseService.ref();
            var newData = {};

            newData[this.oneConstant.dao + '/' + oneKey + '/' + this.manyConstant.dao + '/' + key] = null;
            newData[this.manyConstant.dao + '/' + key] = null;

            var onComplete = function(error) {
                if (error) {
                    $log.error(error);
                    feedback.error('Error deleting ' + this.manyConstant.title + '.');
                } else {
                    feedback.success(this.manyConstant.title + ' deleted successfully.');
                }
            }.bind(this);

            ref.update(newData, onComplete);
        };

        var syncArray = function(key, data, feedback) {
            var keyRef = this.oneRef()
                .child(key)
                .child(this.manyConstant.dao);

            var manyKeys = $firebaseArray(keyRef);

            var watchFn = function(event) {
                if (event.event === 'child_added') {
                    $firebaseObject(this.manyRef().child(event.key)).$loaded()
                        .then(function(obj) {
                            data.push(obj);
                        }).catch(function(error) {
                            $log.error(error);
                            feedback.error('Error reading ' + this.oneConstant.title + ' & ' + this.manyConstant.title + '.');
                        });
                }
                if (event.event === 'child_removed') {
                    data.findIndex(function(obj, index, array) {
                        if (obj.$id === event.key) {
                            array.splice(index, 1);
                        }
                    });
                }
            }.bind(this);

            manyKeys.$watch(watchFn);
        };

        var obj = firebaseDaoFactory(this.manyConstant);
        obj.add = add;
        obj.manyRef = manyRef;
        obj.oneRef = oneRef;
        obj.remove = remove;
        obj.syncArray = syncArray;
        return obj;
    }
})();
