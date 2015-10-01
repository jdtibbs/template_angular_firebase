(function() {
	'use strict';

	angular
		.module('app', [
			'ngMaterial',
			'templates',
			'rx',
			'components.module',
			'home.module',
			'list.module',
			'login.module',
			'services.module',
			'settings.module'
		]);
})();
