(function() {
	'use strict';

	angular.module('components.module')
		.constant('MENU_DAO', 'menu');

	angular.module('components.module')
		.provider('menuConstants', providerFn);

	providerFn.$inject = ['MENU_DAO'];

	function providerFn(MENU_DAO) {

		return {
			dao: function() {
				return MENU_DAO;
			},

			$get: function() {
				return {
					dao: this.dao,

				};
			}
		};
	}
})();
