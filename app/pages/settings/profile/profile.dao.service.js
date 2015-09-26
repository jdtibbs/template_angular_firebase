(function() {

	'use strict';

	angular.module('settings.module')
		.service('profileDaoService', serviceFn);

	serviceFn.$inject = ['FirebaseDaoFactory', '$log', 'rx', 'profileConstants'];

	function serviceFn(FirebaseDaoFactory, $log, rx, profileConstants) {
		// this.save = save;
		this.get = get;

		var dao = new FirebaseDaoFactory(profileConstants);

		this.save = function(profile, feedbackFactory) {
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
		};

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
