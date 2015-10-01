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
                        return ref.$add(object);
                    };
                    var onNext = function() {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(constant.name() + ' added successfully.');
                    };
                    var onError = function() {
                        $log.error(error);
                        feedback.error('Error adding ' + constant.name() + '.');
                    };
                    var onComplete = function() {};

                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                },

                save: function(object, feedback, callback) {
                    var async = function() {
                        return object.$save();
                    };
                    var onNext = function(ref, callback) {
                        if (callback !== undefined) {
                            callback(ref);
                        }
                        feedback.success(constant.name() + ' saved successfully.');
                    };
                    var onError =
                        function(error) {
                            $log.error(error);
                            feedback.error('Error saving ' + constant.name() + '.');
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
                        feedback.error('Error syncing array ' + constant.name() + '.');
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
                        feedback.error('Error syncing object ' + constant.name() + '.');
                    };
                    var onComplete = function() {};
                    rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
                }
            };

            return Object.create(service);
        }
        return factory;
    }
})();
