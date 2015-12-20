(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoFactory', factoryFn);

    factoryFn.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseService', '$log', 'rx'];

    function factoryFn($firebaseArray, $firebaseObject, firebaseService, $log, rx) {

        function factory(constant) {
            var ref = firebaseService.ref().child(constant.dao);

            var service = {
                add: function(object, feedback, callback) {
                    var async = function() {
                        return $firebaseArray(ref).$add(object);
                    };
                    var onNext = function(ref) {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(constant.titleEdit + ' added successfully.');
                    };
                    var onError = function(error) {
                        $log.error(error);
                        feedback.error('Error adding ' + constant.titleEdit + '.');
                    };
                    var onComplete = function() {};

                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                },

                remove: function(key, feedback, callback) {
                    var async = function() {
                        return $firebaseObject(ref.child(key)).$remove();
                    };
                    var onNext = function(ref) {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(constant.titleEdit + ' removed successfully.');
                    };
                    var onError =
                        function(error) {
                            $log.error(error);
                            feedback.error('Error removing ' + constant.titleEdit + '.');
                        };
                    var onComplete = function() {};

                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                },

                save: function(object, feedback, callback) {
                    var async = function() {
                        return object.$save();
                    };
                    var onNext = function(ref) {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(constant.titleEdit + ' saved successfully.');
                    };
                    var onError =
                        function(error) {
                            $log.error(error);
                            feedback.error('Error saving ' + constant.titleEdit + '.');
                        };
                    var onComplete = function() {};

                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                },

                syncArray: function(path, feedback, callback) {
                    var async = function() {
                        var _ref = path ? ref.child(path) : ref;
                        return $firebaseArray(_ref).$loaded();
                    };
                    var onNext = function(data) {
                        callback(data);
                    };
                    var onError = function(error) {
                        $log.error(error);
                        feedback.error('Error reading ' + constant.titleEdit + '.');
                    };
                    var onComplete = function() {};
                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                },

                syncObject: function(path, feedback, callback) {
                    var async = function() {
                        return $firebaseObject(ref.child(path)).$loaded();
                    };
                    var onNext = function(data) {
                        callback(data);
                    };
                    var onError = function(error) {
                        $log.error(error);
                        feedback.error('Error reading ' + constant.titleEdit + '.');
                    };
                    var onComplete = function() {};
                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                }
            };

            return service;
        }
        return factory;
    }
})();
