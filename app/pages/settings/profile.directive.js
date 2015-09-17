(function() {
	'use strict';

	angular.module('settings.module')
		.directive('jdtSettingsProfile', directiveFn);

	directiveFn.$inject = ['FeedbackFactory', '$log', 'profileDaoFactory'];

	function directiveFn(FeedbackFactory, $log, profileDaoFactory) {
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
			templateUrl: 'app/pages/settings/profile.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.cancel = cancel;
			vm.save = save;
			vm.feedback = {};
			var feedbackFactory = new FeedbackFactory(vm.feedback);

			init();

			function cancel() {
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
				profileDaoFactory.syncObject(vm.props.authData.uid)
					.$loaded()
					.then(function(data) {
						vm.profile = data;
					})
					.catch(function(error) {
						feedbackFactory.error(error);
					});
			}

			function save() {
				if (vm.profile.$id) {
					profileDaoFactory.save(vm.profile)
						.then(function(data) {
								feedbackFactory.success('Profile saved successfully.');
							},
							function(error) {
								feedbackFactory.error(error);
							});
				} else {
					profileDaoFactory.add(vm.profile)
						.then(function(data) {
								feedbackFactory.success('Profile added successfully.');
							},
							function(error) {
								feedbackFactory.error(error);
							});
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
