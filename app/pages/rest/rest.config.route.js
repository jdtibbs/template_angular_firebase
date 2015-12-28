(function() {

	'use strict';
	angular.module('rest.module')
		.config(config);

	config.$inject = ['restConstantsProvider', '$routeProvider'];

	function config(restConstantsProvider, $routeProvider) {
		$routeProvider.when(restConstantsProvider.path(), {
			templateUrl: 'app/pages/rest/rest.html'
		});
	}
})();
