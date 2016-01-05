(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoManyToOne', factoryFn);

    factoryFn.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDao', 'firebaseRulesFactory', 'routeParamsFactory', '$log'];

    function factoryFn($firebaseArray, $firebaseObject, firebaseDao, firebaseRulesFactory, routeParamsFactory, $log) {

        var dao = {
            add: function(object, feedback, callback) {
                this.setLastUpdate(object);

                var oneKey = routeParamsFactory.getParam(this.oneConstant.dao);
                var oneRefChild = this.ref().child(this.oneConstant.dao).child(oneKey).child(this.constant.dao);
                var rulesFactory = firebaseRulesFactory(this.constant, oneRefChild);

                var add = function() {
                    var newRef = this.ref().child(this.constant.dao).push();
                    var newKey = newRef.key();
                    var newData = {};

                    newData[this.oneConstant.dao + '/' + oneKey + '/' + this.constant.dao + '/' + newKey] = true;
                    newData[this.constant.dao + '/' + newKey] = object;

                    var onComplete = function(error) {
                        if (error) {
                            $log.error(error);
                            feedback.error('Error writing ' + this.constant.title + '.');
                        } else {
                            feedback.success(this.constant.title + ' saved successfully.');
                            callback(newKey);
                        }
                    }.bind(this);

                    this.ref().update(newData, onComplete);
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
            },

            remove: function(key, feedback) {
                var oneKey = routeParamsFactory.getParam(this.oneConstant.dao);
                var newData = {};

                newData[this.oneConstant.dao + '/' + oneKey + '/' + this.constant.dao + '/' + key] = null;
                newData[this.constant.dao + '/' + key] = null;

                var onComplete = function(error) {
                    if (error) {
                        $log.error(error);
                        feedback.error('Error deleting ' + this.constant.title + '.');
                    } else {
                        feedback.success(this.constant.title + ' deleted successfully.');
                    }
                }.bind(this);

                this.ref().update(newData, onComplete);
            },

            syncArray: function(key, data, feedback) {
                var keyRef = this.ref().child(this.oneConstant.dao)
                    .child(key)
                    .child(this.constant.dao);

                var manyKeys = $firebaseArray(keyRef);

                var watchFn = function(event) {
                    if (event.event === 'child_added') {
                        $firebaseObject(this.ref().child(this.constant.dao).child(event.key)).$loaded()
                            .then(function(obj) {
                                data.push(obj);
                            }).catch(function(error) {
                                $log.error(error);
                                feedback.error('Error reading ' + this.oneConstant.title + ' & ' + this.constant.title + '.');
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
            }
        };

        // create the prototype.
        var objectDescriptor = {
            add: {
                value: dao.add
            },
            remove: {
                value: dao.remove
            },
            syncArray: {
                value: dao.syncArray
            }
        };
        return Object.create(firebaseDao, objectDescriptor);
    }
})();
