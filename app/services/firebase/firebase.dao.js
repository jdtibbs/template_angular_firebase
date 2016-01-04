(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDao', factoryFn);

    factoryFn.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseRulesFactory', 'firebaseService', '$log'];

    function factoryFn($firebaseArray, $firebaseObject, firebaseRulesFactory, firebaseService, $log) {

        return {
            add: function(object, feedback, callback) {
                var rulesFactory = firebaseRulesFactory(this.constant, this.ref());

                // using a function expression vs. function declaration because coding for 'this' is cleaner, IMO.
                // caveat: function expression must preceed the code that will call it.
                var add = function() {
                    var onNext = function(ref) {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(this.constant.titleEdit + ' added successfully.');
                    }.bind(this);
                    var onError = function(error) {
                        $log.error(error);
                        feedback.error('Error adding ' + this.constant.titleEdit + '.');
                    }.bind(this);

                    $firebaseArray(this.ref())
                        .$add(object)
                        .then(onNext)
                        .catch(onError);
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

            ref: function() {
                return firebaseService.ref().child(this.constant.dao);
            },

            remove: function(key, feedback, callback) {
                var onNext = function(ref) {
                    if (callback !== undefined) {
                        callback(ref);
                    }
                    feedback.success(this.constant.titleEdit + ' removed successfully.');
                }.bind(this);
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error removing ' + this.constant.titleEdit + '.');
                }.bind(this);

                $firebaseObject(this.ref().child(key))
                    .$remove()
                    .then(onNext)
                    .catch(onError);
            },

            save: function(object, feedback, callback) {
                var onNext = function(ref) {
                    if (callback !== undefined) {
                        callback(ref);
                    }
                    feedback.success(this.constant.titleEdit + ' saved successfully.');
                }.bind(this);
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error saving ' + this.constant.titleEdit + '.');
                }.bind(this);

                object.$save()
                    .then(onNext)
                    .catch(onError);
            },

            syncArray: function(path, feedback, callback) {
                var onNext = function(data) {
                    callback(data);
                };
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error reading ' + this.constant.titleEdit + '.');
                }.bind(this);

                $firebaseArray(path ? this.ref().child(path) : this.ref())
                    .$loaded()
                    .then(onNext)
                    .catch(onError);
            },

            syncObject: function(path, feedback, callback) {
                var onNext = function(data) {
                    callback(data);
                };
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error reading ' + this.constant.titleEdit + '.');
                }.bind(this);

                $firebaseObject(this.ref().child(path))
                    .$loaded()
                    .then(onNext)
                    .catch(onError);
            }
        };
    }
})();
