(function() {
	'use strict';

	angular.module('test.module')
		.constant('TEST_DAO', 'test')
		.constant('TEST_NAME', 'Test');

	angular.module('test.module')
		.provider('testConstants', providerFn);

	providerFn.$inject = ['TEST_NAME', 'TEST_DAO'];

	function providerFn(TEST_NAME, TEST_DAO) {

		return {
			dao: function() {
				return TEST_DAO;
			},
			name: function() {
				return TEST_NAME;
			},

			$get: function() {
				return {
					dao: this.dao,
					name: this.name
				};
			}
		};
	}
})();
