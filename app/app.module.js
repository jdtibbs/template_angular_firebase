(function() {
	'use strict';

	angular
		.module('app', [
			'templates',
			'rx',
			'components.module',
			'home.module',
			'login.module',
			'services.firebase.module',
			'services.util.module',
		]);
})();
