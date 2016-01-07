(function() {
	'use strict';

	angular
		.module('app', [
			'ngResource',
			'templates',
			'rx',
			'catalog.module',
			'components.module',
			'home.module',
			'login.module',
			'rest.module',
			'services.module',
			'settings.module',
			'vendor.module'
		]);
})();
