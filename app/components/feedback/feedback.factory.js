(function() {

    'use strict';

    angular.module('components.module')
        .factory('feedbackFactory', factoryFn);

    factoryFn.$inject = [];

    function factoryFn() {

        function factory(feedback) {

            var service = {
                init: function() {
                    feedback.errors = [];
                    feedback.success = [];
                },

                error: function(message) {
                    if (feedback.errors === undefined) {
                        this.init();
                    }
                    feedback.errors.push(message);
                },

                success: function(message) {
                    if (feedback.success === undefined) {
                        this.init();
                    }
                    feedback.success.push(message);
                }
            };

            return service;
        }

        return factory;
    }
})();
