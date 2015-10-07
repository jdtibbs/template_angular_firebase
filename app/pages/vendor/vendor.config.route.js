(function() {
	'use strict';

	angular.module('vendor.module')
		.config(config);

	config.$inject = ['vendorConstantsProvider', '$routeProvider'];

	function config(vendorConstantsProvider, $routeProvider) {
		$routeProvider.when(vendorConstantsProvider.path(), {
			templateUrl: 'app/pages/vendor/vendor.html'
		});
	}


})();
