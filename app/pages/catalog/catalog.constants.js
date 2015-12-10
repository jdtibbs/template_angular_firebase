(function() {
	'use strict';

	angular.module('catalog.module')
		.constant('CATALOG_DAO', 'catalog')
		.constant('CATALOG_PATH', '/catalog')
		.constant('CATALOG_PATH_ADD', '/catalog/edit/')
		.constant('CATALOG_PATH_EDIT', '/catalog/edit/')
		.constant('CATALOG_TITLE', 'Catalog')
		.constant('CATALOG_TITLE_EDIT', 'Catalog')
		.provider('catalogConstants', providerFn);

	providerFn.$inject = ['CATALOG_PATH', 'CATALOG_PATH_ADD', 'CATALOG_PATH_EDIT', 'CATALOG_TITLE', 'CATALOG_TITLE_EDIT', 'CATALOG_DAO'];

	function providerFn(CATALOG_PATH, CATALOG_PATH_ADD, CATALOG_PATH_EDIT, CATALOG_TITLE, CATALOG_TITLE_EDIT, CATALOG_DAO) {

		return {
			dao: function() {
				return CATALOG_DAO;
			},
			path: function() {
				return CATALOG_PATH;
			},
			pathAdd: function() {
				return CATALOG_PATH_ADD;
			},
			pathEdit: function() {
				return CATALOG_PATH_EDIT;
			},
			$get: function() {
				return {
					dao: CATALOG_DAO,
					path: CATALOG_PATH,
					pathAdd: CATALOG_PATH_ADD,
					pathEdit: CATALOG_PATH_EDIT,
					title: CATALOG_TITLE,
					titleEdit: CATALOG_TITLE_EDIT,
				};
			}
		};
	}
})();
