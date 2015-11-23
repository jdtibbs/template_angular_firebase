(function() {

    angular.module('components.module')
        .directive('autoFocus', ddo);

    ddo.$inject = ['$timeout', '$log'];

    function ddo($timeout, $log) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function() {
                    element[0].focus();
                });
            }
        };
    }


})();
