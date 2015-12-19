(function() {
	'use strict';

	angular.module('home.module')
		.constant('HOME_PATH', '/home')
		.constant('HOME_TITLE', 'Home')
		.provider('homeConstants', providerFn);

	providerFn.$inject = ['HOME_PATH', 'HOME_TITLE'];

	function providerFn(HOME_PATH, HOME_TITLE) {

		return {
			path: function() {
				return HOME_PATH;
			},
			title: function() {
				return HOME_TITLE;
			},
			$get: function() {
				return {
					path: HOME_PATH,
					title: HOME_TITLE
				};
			}
		};
	}
})();
