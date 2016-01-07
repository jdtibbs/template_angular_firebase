(function() {
	'use strict';

	angular.module('app')
		.config(configFn);

	configFn.$inject = ['$logProvider'];

	function configFn($logProvider) {
		// TODO enable / disable debug logging here.
		$logProvider.debugEnabled(true);
		// $logProvider.debugEnabled(false);
	}
})();
