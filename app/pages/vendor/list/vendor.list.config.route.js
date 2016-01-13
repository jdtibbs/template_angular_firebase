(function() {
	'use strict';

	angular.module('vendor.module')
		.config(config);

	config.$inject = ['vendorConstantsProvider', '$routeProvider'];

	function config(vendorConstantsProvider, $routeProvider) {
		$routeProvider.when(vendorConstantsProvider.path(), {
			templateUrl: 'app/pages/vendor/list/vendor.list.container.html',
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
