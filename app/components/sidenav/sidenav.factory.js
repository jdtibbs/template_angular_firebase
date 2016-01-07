(function() {

	'use strict';

	angular.module('components.module')
		.factory('sidenavFactory', factoryFn);


	function factoryFn() {

		function factory() {
			var sidenav = 'sidenav';
			var service = {
				toggle: function() {
					// $mdSidenav(sidenav).toggle();
				},
				close: function() {
					// $mdSidenav(sidenav).close();
				}
			};
			return service;
		}
		return factory;
	}
})();
