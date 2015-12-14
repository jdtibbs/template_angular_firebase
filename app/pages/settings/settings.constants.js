(function() {
	'use strict';

	angular.module('settings.module')
		.constant('SETTINGS_TITLE', 'Settings')
		.provider('settingsConstants', providerFn);

	providerFn.$inject = ['SETTINGS_TITLE'];

	function providerFn(SETTINGS_TITLE) {

		return {
			title: function() {
				return SETTINGS_TITLE;
			},
			$get: function() {
				return {
					title: SETTINGS_TITLE
				};
			}
		};
	}
})();
