(function() {
	'use strict';

	angular.module('vendor.module')
		.config(config);

	config.$inject = ['vendorConstantsProvider', '$routeProvider'];

	function config(vendorConstantsProvider, $routeProvider) {
		$routeProvider.when(vendorConstantsProvider.pathEdit() + vendorConstantsProvider.dao() + '/:' + vendorConstantsProvider.dao(), {
				templateUrl: 'app/pages/vendor/edit/vendor.edit.container.html'
			})
			.when(vendorConstantsProvider.pathAdd(), {
				templateUrl: 'app/pages/vendor/edit/vendor.edit.container.html'
			});
	}
})();
