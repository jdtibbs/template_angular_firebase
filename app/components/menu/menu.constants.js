(function() {
	'use strict';

	angular.module('components.module')
		.constant('MENU_DAO', 'menu')
		.provider('menuConstants', providerFn);

	providerFn.$inject = ['MENU_DAO'];

	function providerFn(MENU_DAO) {

		return {
			$get: function() {
				return {
					dao: MENU_DAO
				};
			}
		};
	}
})();
