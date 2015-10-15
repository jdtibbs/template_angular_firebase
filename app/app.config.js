(function() {
	'use strict';

	angular.module('app')
		.config(configFn);

	configFn.$inject = ['$logProvider', '$mdThemingProvider'];

	function configFn($logProvider, $mdThemingProvider) {
		// TODO enable / disable debug logging here.
		$logProvider.debugEnabled(true);
		// $logProvider.debugEnabled(false);

		$mdThemingProvider.theme('default')
			.primaryPalette('blue', {
				'default': '700'
			})
			.accentPalette('blue', {
				'default': '600'
			});
	}
})();
