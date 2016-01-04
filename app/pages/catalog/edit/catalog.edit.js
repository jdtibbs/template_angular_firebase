(function() {
	'use strict';

	angular.module('catalog.module')
		.directive('jdtCatalogEdit', directiveFn);

	directiveFn.$inject = ['editToolbarFactory', 'feedbackFactory', 'catalogConstants', 'catalogRouteFactory', 'firebaseDaoManyToOneFactory', 'vendorConstants', '$location', '$log'];

	function directiveFn(editToolbarFactory, feedbackFactory, catalogConstants, catalogRouteFactory, firebaseDaoManyToOneFactory, vendorConstants, $location, $log) {
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
				dao.syncObject(catalogKey, feedback, onNext);

				function onNext(data) {
					vm.model = data;
					vm.add = false;
				}
			}

			function cancel() {
				feedback.init();
				$location.path(catalogRouteFactory.listRoute());
			}

			function save() {
				feedback.init();
				if (vm.add) {
					dao.add(vm.model, feedback, onNext);
				} else {
					dao.save(vm.model, feedback);
				}

				function onNext(catalogKey) {
					initModel(catalogKey);
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
