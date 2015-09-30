(function() {

	'use strict';

	angular.module('test.module')
		.service('testDaoService', serviceFn);

	serviceFn.$inject = ['firebaseDaoFactory', 'testConstants'];

	function serviceFn(firebaseDaoFactory, testConstants) {
		return firebaseDaoFactory(testConstants);
	}
})();
