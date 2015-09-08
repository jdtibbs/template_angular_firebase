(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtLogin', directiveFn);

	directiveFn.$inject = ['$location', '$log', 'loginService', 'rx'];

	function directiveFn($location, $log, loginService, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/login/login.directive.html'
		};

		function controllerFn() {
			var vm = this;

			vm.login = function() {
				var source = rx.Observable.startAsync(function() {
					return loginService.login(vm.email, vm.password);
				});
				var subscription = source.subscribe(
					function(authData) {
						vm.props.authData = authData;
						$log.debug(vm.props.authData);
					},
					function(error) {
						$log.error('Email or password is invalid.');
					},
					function() {
						$log.debug('rx completed');
					});

			};

			vm.forgot = function() {
				$log.debug('forgot');
			};
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
