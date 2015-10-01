(function() {
	'use strict';

	angular.module('home.module')
		.constant('HOME_TITLE', 'Home')
		.provider('homeConstants', providerFn);

	providerFn.$inject = ['HOME_TITLE'];

	function providerFn(HOME_TITLE) {

		return {
			$get: function() {
				return {
					title: HOME_TITLE
				};
			}
		};
	}
})();
