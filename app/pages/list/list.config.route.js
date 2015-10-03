(function() {
	'use strict';

	angular.module('list.module')
		.config(config);

	config.$inject = ['listConstantsProvider', '$routeProvider'];

	function config(listConstantsProvider, $routeProvider) {
		$routeProvider.when(listConstantsProvider.path(), {
			controller: controllerFn,
			controllerAs: 'ctrl',
			templateUrl: 'app/pages/list/list.html'
		});
	}

	controllerFn.$inject = ['listConstants', '$location', '$log'];

	function controllerFn(listConstants, $location, $log) {
		$log.debug('kjsdfhkljdfh');
		var ctrl = this;
		ctrl.toolbar = {
			add: {
				show: true,
				action: add
			}
		};

		function add() {
			$location.path(listConstants.pathAdd);
		}
	}
})();
