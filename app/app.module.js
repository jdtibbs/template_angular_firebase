(function() {
	'use strict';

	angular
		.module('app', [
			'ngMaterial',
			'templates',
			'rx',
			'components.module',
			'home.module',
			'login.module',
			'services.module',
			'settings.module',
			'test.module'
		]);
})();
