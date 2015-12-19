(function() {

	'use strict';
	angular.module('login.module')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'app/pages/login/login.html'
		});
	}
})();
