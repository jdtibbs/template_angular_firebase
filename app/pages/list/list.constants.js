(function() {
	'use strict';

	angular.module('list.module')
		.constant('LIST_DAO', 'list')
		.constant('LIST_PATH', '/list')
		.constant('LIST_PATH_ADD', '/list/edit')
		.constant('LIST_PATH_EDIT', '/list/edit/')
		.constant('LIST_TITLE', 'Friends')
		.constant('LIST_TITLE_EDIT', 'Friend')
		.provider('listConstants', providerFn);

	providerFn.$inject = ['LIST_PATH', 'LIST_PATH_ADD', 'LIST_PATH_EDIT', 'LIST_TITLE', 'LIST_TITLE_EDIT', 'LIST_DAO'];

	function providerFn(LIST_PATH, LIST_PATH_ADD, LIST_PATH_EDIT, LIST_TITLE, LIST_TITLE_EDIT, LIST_DAO) {

		return {
			path: function() {
				return LIST_PATH;
			},
			pathAdd: function() {
				return LIST_PATH_ADD;
			},
			pathEdit: function() {
				return LIST_PATH_EDIT;
			},
			$get: function() {
				return {
					dao: LIST_DAO,
					path: LIST_PATH,
					pathAdd: LIST_PATH_ADD,
					pathEdit: LIST_PATH_EDIT,
					title: LIST_TITLE,
					titleEdit: LIST_TITLE_EDIT,
				};
			}
		};
	}
})();
