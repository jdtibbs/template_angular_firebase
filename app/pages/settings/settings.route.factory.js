(function() {
	'use strict';

	angular.module('settings.module')
		.factory('settingsRouteFactory', factoryFn);

	factoryFn.$inject = ['homeConstants', 'routeParamsFactory'];

	function factoryFn(homeConstants, routeParamsFactory) {

		var od = {
			cancelRoute: {
				value: function() {
					return homeConstants.path;
				}
			}
		};

		return Object.create(routeParamsFactory, od);
	}
})();
