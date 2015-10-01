(function() {
	'use strict';

	angular.module('list.module')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'app/pages/list/list.html'
		});
	}
})();
