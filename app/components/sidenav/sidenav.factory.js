(function() {

	'use strict';

	angular.module('components.module')
		.factory('sidenavFactory', factoryFn);

	factoryFn.$inject = ['$mdSidenav'];

	function factoryFn($mdSidenav) {

		function factory(element) {

			var sidenav = angular.element(element[0]).find('md-sidenav')[0].attributes.getNamedItem('md-component-id').value;
			var service = {
				id: sidenav,
				toggle: function() {
					$mdSidenav(this.id).toggle();
				},
				close: function() {
					$mdSidenav(this.id).close();
				}
			};
			return service;
		}
		return factory;
	}
})();
