(function() {
	'use strict';

	angular.module('list.module')
		.config(config);

	config.$inject = ['listConstantsProvider', '$routeProvider'];

	function config(listConstantsProvider, $routeProvider) {
		$routeProvider.when(listConstantsProvider.pathEdit() + ':key', {
				templateUrl: 'app/pages/list/edit/edit.html'
			})
			.when(listConstantsProvider.pathAdd(), {
				templateUrl: 'app/pages/list/edit/edit.html'
			});
	}
})();
