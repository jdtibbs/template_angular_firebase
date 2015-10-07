(function() {
	'use strict';

	angular.module('list.module')
		.factory('listDaoFactory', factoryFn);

	factoryFn.$inject = ['firebaseDaoFactory', 'listConstants'];

	function factoryFn(firebaseDaoFactory, listConstants) {
		return firebaseDaoFactory(listConstants);
	}
})();
