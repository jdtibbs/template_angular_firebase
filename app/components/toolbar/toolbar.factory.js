(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarFactory', factoryFn);

    factoryFn.$inject = ['$log'];

    function factoryFn($log) {

        function factory(props) {
            props.toolbar = {};
            props.toolbar.add = {};
            props.toolbar.search = {};

            var service = {
                init: function() {
                    this.add.init();
                    this.search.init();
                    props.toolbar.search.value = '';
                },
                add: {
                    init: function() {
                        this.hideButton();
                    },
                    showButton: function() {
                        props.toolbar.add.show = true;
                    },
                    hideButton: function() {
                        props.toolbar.add.show = false;
                    }
                },
                search: {
                    init: function() {
                        this.hideButton();
                    },
                    blur: function() {
                        if (props.toolbar.search.value === undefined || props.toolbar.search.value.length < 1) {
                            this.close();
                        }
                    },
                    showButton: function() {
                        props.toolbar.search.show = true;
                    },
                    hideButton: function() {
                        props.toolbar.search.show = false;
                    },
                    showText: function() {
                        this.hideButton();
                        props.toolbar.search.text = true;
                    },
                    hideText: function() {
                        props.toolbar.search.text = false;
                    },
                    close: function() {
                        props.toolbar.search.text = false;
                        props.toolbar.search.value = '';
                        this.showButton();
                    }
                }
            };

            return service;
        }
        return factory;
    }
})();
