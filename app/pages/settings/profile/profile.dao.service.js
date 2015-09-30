(function() {

	'use strict';

	angular.module('settings.module')
		.service('profileDaoService', serviceFn);

	serviceFn.$inject = ['firebaseDaoFactory', 'profileConstants'];

	function serviceFn(firebaseDaoFactory, profileConstants) {
		return firebaseDaoFactory(profileConstants);
	}
})();
