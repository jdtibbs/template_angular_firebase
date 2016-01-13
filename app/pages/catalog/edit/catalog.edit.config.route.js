(function() {
	'use strict';

	angular.module('catalog.module')
		.config(config);

	config.$inject = ['catalogConstantsProvider', 'vendorConstantsProvider', '$routeProvider'];

	function config(catalogConstantsProvider, vendorConstantsProvider, $routeProvider) {
		$routeProvider.when(catalogConstantsProvider.pathEdit() + vendorConstantsProvider.dao() + '/:' + vendorConstantsProvider.dao() + '/' + catalogConstantsProvider.dao() + '/:' + catalogConstantsProvider.dao(), {
				templateUrl: 'app/pages/catalog/edit/catalog.edit.container.html',
				resolve: {
					requireAuth: requireAuth
				}
			})
			.when(catalogConstantsProvider.pathAdd() + vendorConstantsProvider.dao() + '/:' + vendorConstantsProvider.dao(), {
				templateUrl: 'app/pages/catalog/edit/catalog.edit.container.html',
				resolve: {
					requireAuth: requireAuth
				}
			});
	}

	requireAuth.$inject = ['loginService'];

	function requireAuth(loginService) {
		return loginService.requireAuth();
	}
})();
