(function() {
	'use strict';

	angular.module('list.module')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/list/edit/:key', {
				templateUrl: 'app/pages/list/edit/edit.html'
			})
			.when('/list/edit', {
				templateUrl: 'app/pages/list/edit/edit.html'
			});
	}
})();
