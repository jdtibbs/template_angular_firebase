(function() {

    'use strict';

    angular.module('components.module')
        .factory('FeedbackFactory', factoryFn);

    factoryFn.$inject = [];

    function factoryFn() {

        return FeedbackFactory;

        function FeedbackFactory(feedback) {
            this.feedback = feedback;
            this.init = init;
            this.success = success;
            this.error = error;
            this.init();

            function init() {
                this.feedback.errors = [];
                this.feedback.success = [];
            }

            function success(message) {
                this.feedback.success.push(message);
            }

            function error(message) {
                this.feedback.errors.push(message);
            }
        }
    }
})();
