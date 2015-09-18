(function() {
	'use strict';

	angular.module('settings.module')
		.constant('PROFILE_DAO', 'profile');

	angular.module('settings.module')
		.provider('profileConstants', providerFn);

	providerFn.$inject = ['PROFILE_DAO'];

	function providerFn(PROFILE_DAO) {

		return {
			dao: function() {
				return PROFILE_DAO;
			},

			$get: function() {
				return {
					dao: this.dao,

				};
			}
		};
	}
})();
