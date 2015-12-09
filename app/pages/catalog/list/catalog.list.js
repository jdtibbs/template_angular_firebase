(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtCatalogList', directiveFn);

	directiveFn.$inject = ['firebaseDaoOneToManyFactory', 'baseTabListControllerService', 'feedbackFactory', 'catalogConstants', 'catalogRouteFactory', 'vendorConstants', '$location', '$log', '$timeout', 'rx'];

	function directiveFn(firebaseDaoOneToManyFactory, baseTabListControllerService, feedbackFactory, catalogConstants, catalogRouteFactory, vendorConstants, $location, $log, $timeout, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/catalog/list/catalog.list.html'
		};

		function controllerFn() {
			var vm = this;

			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// TODO: make a service to build this for all list controllers.
			(function() {
				vm.data = [];
				var vendorKey = catalogRouteFactory.getParam(vendorConstants.dao);
				if (vendorKey) {
					firebaseDaoOneToManyFactory(vendorConstants, catalogConstants, feedback)
						.syncArray(vendorKey, onAdd, onChange, onRemove);
				}

				function onAdd(snap) {
					var obj = snap.val();
					obj.$id = snap.key();
					$timeout(
						function() {
							vm.data.push(obj);
						}, 0);
				}

				function onChange(snap) {
					$timeout(
						function() {
							vm.data = vm.data.map(function(element) {
								if (element.$id === snap.key()) {
									var obj = snap.val();
									obj.$id = snap.key();
									return obj;
								} else {
									return element;
								}
							});
						}, 0);
				}

				function onRemove(snap) {
					$timeout(
						function() {
							vm.data = vm.data.filter(function(element, index) {
								if (element.$id !== snap.key()) {
									return true;
								}
							});
						}, 0);
				}
			})();

			function edit(key) {
				$location.path(catalogRouteFactory.editRoute(key));
			}

			function remove(key, event) {
				event.stopPropagation();
				var fn = rx.Observable.fromCallback(catalogDaoFactory.remove);
				fn(key, feedback).subscribe(onNextRemove, onErrorRemove);

				function onNextRemove(ref) {}

				function onErrorRemove(error) {
					$log.error(error);
					feedback.error(error);
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
