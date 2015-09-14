(function() {

    'use strict';

    angular.module('components.module')
        .factory('FeedbackFactory', factoryFn);

    factoryFn.$inject = [];

    function factoryFn() {

        return FeedbackFactory;

        function FeedbackFactory(feedback) {
            this.feedback = feedback;
            this.success = success;
            this.error = error;

            if (this.feedback.success === undefined) {
                this.feedback.success = [];
            }
            if (this.feedback.errors === undefined) {
                this.feedback.errors = [];
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
