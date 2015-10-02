(function() {

	'use strict';

	angular.module('settings.module')
		.factory('profileDaoFactory', factoryFn);

	factoryFn.$inject = ['firebaseDaoFactory', 'profileConstants'];

	function factoryFn(firebaseDaoFactory, profileConstants) {
		return firebaseDaoFactory(profileConstants);
	}
})();
