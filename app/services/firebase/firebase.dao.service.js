(function() {

    'use strict';

    angular.module('services.module')
        .service('firebaseDaoService', serviceFn);

    serviceFn.$inject = ['$firebaseArray', '$firebaseObject', '$log', 'rx'];

    function serviceFn($firebaseArray, $firebaseObject, $log, rx) {

        var service = {
            add: function(object, feedback, callback) {
                var async = function() {
                    return this.ref.$add(object);
                }.bind(this);
                var onNext = function() {
                    if (callback !== undefined) {
                        callback(ref);
                    }
                    feedback.success(this.constant.name() + ' added successfully.');
                }.bind(this);
                var onError = function() {
                    $log.error(error);
                    feedback.error('Error adding ' + this.constant.name() + '.');
                }.bind(this);
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
                    // feedback.success(this.constant.name() + ' saved successfully.');
                    feedback.success(this.constant.name() + ' saved successfully.');
                }.bind(this);
                var onError =
                    function(error) {
                        $log.error(error);
                        feedback.error('Error saving ' + this.constant.name() + '.');
                    }.bind(this);
                var onComplete = function() {};

                rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
            },

            syncArray: function(path, feedback, callback) {
                var async = function() {
                    var ref = path ? this.ref.child(path) : this.ref;
                    return $firebaseArray(ref).$loaded();
                }.bind(this);
                var onNext = function(data) {
                    callback(data);
                };
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error syncing array ' + this.constant.name() + '.');
                }.bind(this);
                var onComplete = function() {
                    // $log.debug('rx syncArray complete.');
                };
                rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
            },

            syncObject: function(path, feedback, callback) {
                var async = function() {
                    return $firebaseObject(this.ref.child(path)).$loaded();
                }.bind(this);
                var onNext = function(data) {
                    callback(data);
                };
                var onError = function(error) {
                    $log.error(error);
                    feedback.error('Error syncing object ' + this.constant.name() + '.');
                }.bind(this);
                var onComplete = function() {
                    // $log.debug('rx syncObject complete.');
                };
                rx.Observable.startAsync(async).subscribe(onNext, onError, onComplete);
            }
        };

        return service;
    }
})();
