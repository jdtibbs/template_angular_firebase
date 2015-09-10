(function() {
	'use strict';

	angular
		.module('app')
		.run(runFn);

	runFn.$inject = ['$rootScope', '$timeout'];

	function runFn($rootScope, $timeout) {
		$rootScope.$on('$viewContentLoaded', function() {
			$timeout(function() {
				// config material design lite.
				componentHandler.upgradeAllRegistered();
			});
		});
	}
})();
