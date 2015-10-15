(function() {

    'use strict';

    angular.module('components.module')
        .factory('toolbarFactory', factoryFn);

    factoryFn.$inject = ['$log'];

    function factoryFn($log) {

        function factory() {
            toolbar = {};
            toolbar.props = {
                add: {},
                search: {}
            };
            toolbar.service = {
                init: function() {
                    this.add.init();
                    this.search.init();
                },
                add: {
                    init: function() {
                        this.hideButton();
                    },
                    showButton: function() {
                        toolbar.props.add.show = true;
                        toolbar.props.vertMenu = true;
                    },
                    hideButton: function() {
                        toolbar.props.add.show = false;
                        toolbar.props.vertMenu = false;
                    }
                },
                menu: {
                    open: function(menu, event) {
                        menu(event);
                    }
                },
                search: {
                    init: function() {
                        toolbar.props.search.value = '';
                        this.hideButton();
                        this.hideText();
                    },
                    blur: function() {
                        if (toolbar.props.search.value === undefined || toolbar.props.search.value.length < 1) {
                            this.close();
                        }
                    },
                    showButton: function() {
                        toolbar.props.search.show = true;
                        toolbar.props.vertMenu = true;
                    },
                    hideButton: function() {
                        toolbar.props.search.show = false;
                        toolbar.props.vertMenu = false;
                    },
                    showText: function() {
                        this.hideButton();
                        toolbar.props.search.text = true;
                    },
                    hideText: function() {
                        toolbar.props.search.text = false;
                    },
                    close: function() {
                        toolbar.props.search.text = false;
                        toolbar.props.search.value = '';
                        this.showButton();
                    }
                }
            };

            return toolbar;
        }
        return factory;
    }
})();