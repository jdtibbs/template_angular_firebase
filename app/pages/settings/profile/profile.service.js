(function() {

	'use strict';

	angular.module('settings.module')
		.service('profileService', serviceFn);

	serviceFn.$inject = ['FirebaseFactory', '$log', 'rx', 'profileConstants'];

	function serviceFn(FirebaseFactory, $log, rx, profileConstants) {
		this.save = save;
		this.get = get;

		var dao = new FirebaseFactory(profileConstants);

		function save(profile, feedbackFactory) {
			if (profile.$id) {
				dao.save(profile)
					.then(function(ref) {
							feedbackFactory.success('Profile saved successfully.');
						},
						function(error) {
							feedbackFactory.error(error);
						});
			} else {
				dao.add(profile)
					.then(function(ref) {
							feedbackFactory.success('Profile added successfully.');
						},
						function(error) {
							feedbackFactory.error(error);
						});
			}
		}

		function get(key, feedbackFactory, setCallback) {
			var ref = dao.ref().child(key);
			dao.syncObject(ref)
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
