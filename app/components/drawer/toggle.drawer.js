angular.module('components.module')
    .directive('jdtToggleDrawer', function() {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    var drawer = angular.element(document.querySelectorAll('.mdl-layout__drawer, .mdl-layout__obfuscator'));
                    if (drawer) {
                        drawer.removeClass('is-visible');
                    }
                });
            }
        };
    });
