(function() {
	'use strict';

	angular.module('vendor.module')
		.factory('vendorRouteFactory', factoryFn);

	factoryFn.$inject = ['vendorConstants', 'routeParamsFactory'];

	function factoryFn(vendorConstants, routeParamsFactory) {

		var od = {
			addRoute: {
				value: function() {
					return vendorConstants.pathEdit;
				}
			},
			editRoute: {
				value: function(key) {
					return vendorConstants.pathEdit + vendorConstants.dao + '/' + key;
				}
			},
			listRoute: {
				value: function() {
					return vendorConstants.path;
				}
			}
		};

		return Object.create(routeParamsFactory, od);
	}
})();
