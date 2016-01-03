(function() {
	'use strict';

	angular.module('catalog.module')
		.directive('jdtCatalogEdit', directiveFn);

	directiveFn.$inject = ['editToolbarFactory', 'feedbackFactory', 'catalogConstants', 'catalogDaoFactory', 'catalogRouteFactory', 'firebaseDaoManyToOneFactory', 'vendorConstants', '$location', '$log', 'rx'];

	function directiveFn(editToolbarFactory, feedbackFactory, catalogConstants, catalogDaoFactory, catalogRouteFactory, firebaseDaoManyToOneFactory, vendorConstants, $location, $log, rx) {
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
			templateUrl: 'app/pages/catalog/edit/catalog.edit.html'
		};

		function controllerFn() {
			var vm = this;

			vm.props.components = editToolbarFactory(catalogConstants, catalogRouteFactory);

			// TODO: make factory to build this for all edit directives.

			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			var dao = firebaseDaoManyToOneFactory(catalogConstants, vendorConstants);

			(function() {
				var catalogKey = catalogRouteFactory.getParam(catalogConstants.dao);
				if (catalogKey) {
					initModel(catalogKey);
				} else {
					vm.add = true;
					vm.model = {};
				}
			})();

			function initModel(catalogKey) {
				var fn = rx.Observable.fromCallback(catalogDaoFactory.syncObject.bind(catalogDaoFactory));
				fn(catalogKey, feedback).subscribe(onNext, onError);

				function onNext(data) {
					vm.model = data;
					vm.add = false;
				}

				function onError(error) {
					$log.error(error);
					feedback.error(error);
				}
			}

			function cancel() {
				feedback.init();
				$location.path(catalogRouteFactory.listRoute());
			}

			function save() {
				feedback.init();
				if (vm.add) {
					dao.add(vm.model, onAdd, feedback);
				} else {
					var fn = rx.Observable.fromCallback(catalogDaoFactory.save.bind(catalogDaoFactory));
					fn(vm.model, feedback).subscribe(onNext, onError);
				}

				function onAdd(catalogKey) {
					initModel(catalogKey);
				}

				function onNext(ref) {
					// $log.debug(ref);
				}

				function onError(error) {
					$log.error(error);
					feedback.error(error);
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
