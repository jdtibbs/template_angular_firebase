(function() {

	'use strict';

	angular.module('test.module')
		.factory('testDaoFactory', factoryFn);

	factoryFn.$inject = ['firebaseDaoFactory', 'testConstants'];

	function factoryFn(firebaseDaoFactory, testConstants) {
		return firebaseDaoFactory(testConstants);
	}
})();
