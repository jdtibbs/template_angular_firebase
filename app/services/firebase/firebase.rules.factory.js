(function() {

    // for portfolio, implementation of some rules to disable and or limit ability to add rows to firebase.

    'use strict';

    angular.module('services.module')
        .factory('firebaseRulesFactory', factoryFn);

    factoryFn.$inject = ['firebaseService', '$log'];

    function factoryFn(firebaseService, $log) {

        function factory(constant, ref) {
            var rulesRef = firebaseService.ref().child('appRules');

            var service = {
                canAdd: function(feedback, callback) {
                    rulesRef.child('add').once('value', function(snap) {
                        if (snap.val() === false) {
                            feedback.error('Create and update on ' + constant.titleEdit + ' is disabled.');
                        }
                        callback(snap.val());
                    }, function(error) {
                        handleError(error, feedback, callback);
                    });
                },
                isAddLimit: function(feedback, callback) {
                    rulesRef.child('isAddLimit').once('value', function(snap) {
                        callback(snap.val());
                    }, function(error) {
                        handleError(error, feedback, callback);
                    });
                },
                isWithinAddLimit: function(feedback, callback) {
                    rulesRef.child('addLimit').once('value', function(ruleSnap) {
                        ref.once('value', function(snap) {
                            if (snap.numChildren() > ruleSnap.val()) {
                                feedback.error('Cannot add new rows to ' + constant.titleEdit + '. Row limit has been exceeded.');
                            }
                            callback(snap.numChildren() <= ruleSnap.val());
                        }, function(error) {
                            handleError(error, feedback, callback);
                        });
                    }, function(error) {
                        handleError(error, feedback, callback);
                    });
                }
            };

            function handleError(error, feedback, callback) {
                $log.error(error);
                feedback.error(error);
                callback(false);
            }

            return service;
        }
        return factory;
    }
})();
