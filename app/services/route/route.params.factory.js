(function() {
	'use strict';

	angular.module('services.module')
		.factory('routeParamsFactory', factoryFn);

	factoryFn.$inject = ['$routeParams'];

	function factoryFn($routeParams) {

		return {
			getParam: function(key) {
				var param = Object.getOwnPropertyNames($routeParams).filter(function(element) {
					if (element === key) {
						return true;
					}
				});
				return $routeParams[param];
			},
			getParams: function() {
				var keys = Object.getOwnPropertyNames($routeParams).map(function(element) {
					return {
						key: element,
						value: $routeParams[element]
					};
				});
				return keys;
			}
		};
	}
})();
