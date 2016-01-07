(function() {
	'use strict';

	angular.module('catalog.module')
		.directive('jdtCatalogEdit', directiveFn);

	directiveFn.$inject = ['toolbarEditFactory', 'feedbackFactory', 'catalogConstants', 'catalogRouteFactory', 'firebaseDaoManyToOneFactory', 'vendorConstants', '$location', '$log'];

	function directiveFn(toolbarEditFactory, feedbackFactory, catalogConstants, catalogRouteFactory, firebaseDaoManyToOneFactory, vendorConstants, $location, $log) {
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

			vm.props.components = toolbarEditFactory(catalogConstants, catalogRouteFactory);

			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			var dao = firebaseDaoManyToOneFactory(catalogConstants, vendorConstants);

			initModel(catalogRouteFactory.getParam(catalogConstants.dao));

			function initModel(key) {
				if (key) {
					dao.syncObject(key, feedback, onNext);
				} else {
					vm.add = true;
					vm.model = {};
				}

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
					dao.add(vm.model, feedback, onAdd);
				} else {
					dao.save(vm.model, feedback);
				}

				function onAdd(key) {
					initModel(key);
				}
			}
		}

		function linkFn(scope, elem, attrs, form) {
			scope.vm.form = form;
		}
	}
})();
