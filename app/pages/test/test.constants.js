(function() {
	'use strict';

	angular.module('test.module')
		.constant('TEST_DAO', 'test');

	angular.module('test.module')
		.provider('testConstants', providerFn);

	providerFn.$inject = ['TEST_DAO'];

	function providerFn(TEST_DAO) {

		return {
			dao: function() {
				return TEST_DAO;
			},

			$get: function() {
				return {
					dao: this.dao,

				};
			}
		};
	}
})();
