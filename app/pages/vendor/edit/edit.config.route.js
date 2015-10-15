(function() {
	'use strict';

	angular.module('vendor.module')
		.config(config);

	config.$inject = ['vendorConstantsProvider', '$routeProvider'];

	function config(vendorConstantsProvider, $routeProvider) {
		$routeProvider.when(vendorConstantsProvider.pathEdit() + ':key', {
				templateUrl: 'app/pages/vendor/edit/edit.html'
			})
			.when(vendorConstantsProvider.pathAdd(), {
				templateUrl: 'app/pages/vendor/edit/edit.html'
			});
	}
})();
