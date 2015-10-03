(function() {
	'use strict';

	angular.module('list.module')
		.config(config);

	config.$inject = ['listConstantsProvider', '$routeProvider'];

	function config(listConstantsProvider, $routeProvider) {
		$routeProvider.when(listConstantsProvider.path(), {
			templateUrl: 'app/pages/list/list.html'
		});
	}
})();
