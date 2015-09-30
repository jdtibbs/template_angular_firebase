(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsProfile', directiveFn);

	directiveFn.$inject = ['feedbackFactory', '$log', 'profileDaoService'];

	function directiveFn(feedbackFactory, $log, profileDaoService) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			require: '^form',
			templateUrl: 'app/pages/settings/profile/profile.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			init();

			function cancel() {
				feedback.init();
				init();
			}

			function init() {
				if (vm.form) {
					vm.form.$setPristine();
					vm.form.$setUntouched();
				}
				vm.profile = {
					firstName: null,
					lastName: null
				};

				profileDaoService.syncObject(vm.props.authData.uid, feedback, syncProfile);

				function syncProfile(profile) {
					vm.profile = profile;
				}
			}

			function save() {
				feedback.init();
				profileDaoService.save(vm.profile, feedback);
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
