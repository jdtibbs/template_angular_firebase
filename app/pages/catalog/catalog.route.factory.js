(function() {
	'use strict';

	angular.module('catalog.module')
		.factory('catalogRouteFactory', factoryFn);

	factoryFn.$inject = ['catalogConstants', 'vendorConstants', 'routeParamsFactory'];

	function factoryFn(catalogConstants, vendorConstants, routeParamsFactory) {

		var od = {
			addRoute: {
				value: function() {
					var vendorKey = routeParamsFactory.getParam(vendorConstants.dao);
					return catalogConstants.pathEdit + vendorConstants.dao + '/' + vendorKey;
				}
			},
			editRoute: {
				value: function(catalogKey) {
					var vendorKey = routeParamsFactory.getParam(vendorConstants.dao);
					return catalogConstants.pathEdit + vendorConstants.dao + '/' + vendorKey + '/' + catalogConstants.dao + '/' + catalogKey;
				}
			},
			listRoute: {
				value: function() {
					var vendorKey = routeParamsFactory.getParam(vendorConstants.dao);
					return vendorConstants.pathEdit + vendorConstants.dao + '/' + vendorKey;
				}
			}
		};

		return Object.create(routeParamsFactory, od);
	}
})();
