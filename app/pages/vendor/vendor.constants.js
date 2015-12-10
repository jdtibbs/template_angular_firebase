(function() {
	'use strict';

	angular.module('vendor.module')
		.constant('VENDOR_DAO', 'vendor')
		.constant('VENDOR_PATH', '/vendor')
		.constant('VENDOR_PATH_ADD', '/vendor/edit')
		.constant('VENDOR_PATH_EDIT', '/vendor/edit/')
		.constant('VENDOR_TITLE', 'Vendors')
		.constant('VENDOR_TITLE_EDIT', 'Vendor')
		.provider('vendorConstants', providerFn);

	providerFn.$inject = ['VENDOR_PATH', 'VENDOR_PATH_ADD', 'VENDOR_PATH_EDIT', 'VENDOR_TITLE', 'VENDOR_TITLE_EDIT', 'VENDOR_DAO'];

	function providerFn(VENDOR_PATH, VENDOR_PATH_ADD, VENDOR_PATH_EDIT, VENDOR_TITLE, VENDOR_TITLE_EDIT, VENDOR_DAO) {

		return {
			dao: function() {
				return VENDOR_DAO;
			},
			path: function() {
				return VENDOR_PATH;
			},
			pathAdd: function() {
				return VENDOR_PATH_ADD;
			},
			pathEdit: function() {
				return VENDOR_PATH_EDIT;
			},
			title: function() {
				return VENDOR_TITLE;
			},
			titleEdit: function() {
				return VENDOR_TITLE_EDIT;
			},
			$get: function() {
				return {
					dao: VENDOR_DAO,
					path: VENDOR_PATH,
					pathAdd: VENDOR_PATH_ADD,
					pathEdit: VENDOR_PATH_EDIT,
					title: VENDOR_TITLE,
					titleEdit: VENDOR_TITLE_EDIT,
				};
			}
		};
	}
})();
