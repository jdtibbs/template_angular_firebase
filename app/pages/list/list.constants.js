(function() {
	'use strict';

	angular.module('list.module')
		.constant('LIST_DAO', 'list')
		.constant('LIST_TITLE', 'Friends')
		.constant('LIST_TITLE_EDIT', 'Friend')
		.provider('listConstants', providerFn);

	providerFn.$inject = ['LIST_TITLE', 'LIST_TITLE_EDIT', 'LIST_DAO'];

	function providerFn(LIST_TITLE, LIST_TITLE_EDIT, LIST_DAO) {

		return {
			$get: function() {
				return {
					dao: LIST_DAO,
					title: LIST_TITLE,
					titleEdit: LIST_TITLE_EDIT,
				};
			}
		};
	}
})();
