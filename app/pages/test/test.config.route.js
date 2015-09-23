(function() {

	'use strict';
	angular.module('test.module')
		.config(config);
	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/test', {
			templateUrl: 'app/pages/test/test.html'
		});
	}
})();
