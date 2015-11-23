(function() {
	'use strict';

	angular.module('catalog.module')
		.factory('catalogDaoFactory', factoryFn);

	factoryFn.$inject = ['firebaseDaoFactory', 'catalogConstants'];

	function factoryFn(firebaseDaoFactory, catalogConstants) {
		return firebaseDaoFactory(catalogConstants);
	}
})();
