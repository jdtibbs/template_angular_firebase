(function() {
	'use strict';

	angular.module('rest.module')
		.constant('REST_PATH', '/rest')
		.constant('REST_TITLE', 'RESTful')
		.provider('restConstants', providerFn);

	providerFn.$inject = ['REST_PATH', 'REST_TITLE'];

	function providerFn(REST_PATH, REST_TITLE) {

		return {
			path: function() {
				return REST_PATH;
			},
			title: function() {
				return REST_TITLE;
			},
			$get: function() {
				return {
					path: REST_PATH,
					title: REST_TITLE
				};
			}
		};
	}
})();
