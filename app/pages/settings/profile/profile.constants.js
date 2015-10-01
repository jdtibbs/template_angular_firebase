(function() {
	'use strict';

	angular.module('settings.module')
		.constant('PROFILE_DAO', 'profile')
		.constant('PROFILE_TITLE', 'Profile');

	angular.module('settings.module')
		.provider('profileConstants', providerFn);

	providerFn.$inject = ['PROFILE_TITLE', 'PROFILE_DAO'];

	function providerFn(PROFILE_TITLE, PROFILE_DAO) {

		return {
			$get: function() {
				return {
					dao: PROFILE_DAO,
					title: PROFILE_TITLE
				};
			}
		};
	}
})();
