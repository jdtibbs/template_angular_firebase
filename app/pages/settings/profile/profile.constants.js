(function() {
	'use strict';

	angular.module('settings.module')
		.constant('PROFILE_DAO', 'profile')
		.constant('PROFILE_NAME', 'Profile');

	angular.module('settings.module')
		.provider('profileConstants', providerFn);

	providerFn.$inject = ['PROFILE_NAME', 'PROFILE_DAO'];

	function providerFn(PROFILE_NAME, PROFILE_DAO) {

		return {
			dao: function() {
				return PROFILE_DAO;
			},
			name: function() {
				return PROFILE_NAME;
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
