(function() {
	'use strict';

	angular.module('services.firebase.module')
		.constant('FIREBASE_URL', 'https://jdt-sandbox.firebaseio.com/');

	angular.module('services.firebase.module')
		.provider('firebaseConstants', providerFn);

	providerFn.$inject = ['FIREBASE_URL'];

	function providerFn(FIREBASE_URL) {

		return {

			url: function() {
				return FIREBASE_URL;
			},

			$get: function() {
				return {
					url: this.url
				};
			}
		};

	}

})();
