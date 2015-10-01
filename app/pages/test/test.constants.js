(function() {
	'use strict';

	angular.module('test.module')
		.constant('TEST_DAO', 'test')
		.constant('TEST_TITLE', 'Test')
		.provider('testConstants', providerFn);

	providerFn.$inject = ['TEST_TITLE', 'TEST_DAO'];

	function providerFn(TEST_TITLE, TEST_DAO) {

		return {
			$get: function() {
				return {
					dao: TEST_DAO,
					title: TEST_TITLE
				};
			}
		};
	}
})();
