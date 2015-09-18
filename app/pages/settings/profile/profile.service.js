(function() {

	'use strict';

	angular.module('settings.module')
		.service('profileService', serviceFn);

	serviceFn.$inject = ['profileDaoService', '$log', 'rx'];

	function serviceFn(profileDaoService, $log, rx) {
		this.save = save;
		this.get = get;

		function save(profile, feedbackFactory) {
			if (profile.$id) {
				profileDaoService.save(profile)
					.then(function(ref) {
							feedbackFactory.success('Profile saved successfully.');
						},
						function(error) {
							feedbackFactory.error(error);
						});
			} else {
				profileDaoService.add(profile)
					.then(function(ref) {
							feedbackFactory.success('Profile added successfully.');
						},
						function(error) {
							feedbackFactory.error(error);
						});
			}
		}

		function get(key, feedbackFactory, setCallback) {
			profileDaoService.get(key)
				.$loaded()
				.then(function(data) {
					setCallback(data);
				})
				.catch(function(error) {
					feedbackFactory.error(error);
				});
		}
	}
})();
