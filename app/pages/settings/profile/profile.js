(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsProfile', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', '$log', 'profileDaoService'];

	function directiveFn(FeedbackFactory, $log, profileDaoService) {
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
			var feedbackFactory = new FeedbackFactory(vm.feedback);

			init();

			function cancel() {
				feedbackFactory.init();
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
				profileDaoService.get(vm.props.authData.uid, feedbackFactory, setCallback);

				function setCallback(data) {
					vm.profile = data;
				}
			}

			function save() {
				feedbackFactory.init();
				profileDaoService.save(vm.profile, feedbackFactory);
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
