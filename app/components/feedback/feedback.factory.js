(function() {

    'use strict';

    angular.module('components.module')
        .factory('FeedbackFactory', factoryFn);

    factoryFn.$inject = [];

    function factoryFn() {

        return FeedbackFactory;

        function FeedbackFactory(feedback) {
            this.init = init;
            this.success = success;
            this.error = error;

            this.init();

            function init() {
                feedback.errors = [];
                feedback.success = [];
            }

            function success(message) {
                feedback.success.push(message);
            }

            function error(message) {
                feedback.errors.push(message);
            }
        }
    }
})();
