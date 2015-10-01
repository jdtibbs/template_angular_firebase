(function() {
	'use strict';

	angular.module('list.module')
		.constant('LIST_DAO', 'list')
		.constant('LIST_TITLE', 'List')
		.provider('listConstants', providerFn);

	providerFn.$inject = ['LIST_TITLE', 'LIST_DAO'];

	function providerFn(LIST_TITLE, LIST_DAO) {

		return {
			$get: function() {
				return {
					dao: LIST_DAO,
					title: LIST_TITLE
				};
			}
		};
	}
})();
