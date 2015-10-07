(function() {
	'use strict';

	angular.module('vendor.module')
		.factory('vendorDaoFactory', factoryFn);

	factoryFn.$inject = ['firebaseDaoFactory', 'vendorConstants'];

	function factoryFn(firebaseDaoFactory, vendorConstants) {
		return firebaseDaoFactory(vendorConstants);
	}
})();
