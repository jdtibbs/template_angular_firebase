(function() {
	'use strict';

	angular
		.module('app', [
			'ngMaterial',
			'templates',
			'rx',
			'catalog.module',
			'components.module',
			'home.module',
			'login.module',
			'services.module',
			'settings.module',
			'vendor.module'
		]);
})();
