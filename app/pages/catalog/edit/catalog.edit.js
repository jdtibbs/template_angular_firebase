(function() {
	'use strict';

	angular.module('catalog.module')
		.directive('jdtCatalogEdit', directiveFn);

	directiveFn.$inject = ['baseEditControllerService', 'feedbackFactory', 'catalogConstants', 'catalogDaoFactory', 'catalogRouteFactory', '$location', '$log', 'rx'];

	function directiveFn(baseEditControllerService, feedbackFactory, catalogConstants, catalogDaoFactory, catalogRouteFactory, $location, $log, rx) {
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

			baseEditControllerService.init(vm.props, catalogConstants, cancel);

			// TODO: make factory to build this for all edit directives.

			vm.add = false;
			vm.cancel = cancel;
			vm.save = save;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			initModel();

			function initModel() {
				var catalogKey = catalogRouteFactory.getParam(catalogConstants.dao);
				if (catalogKey) {
					var fn = rx.Observable.fromCallback(catalogDaoFactory.syncObject);
					fn(catalogKey, feedback).subscribe(onNext, onError);
				} else {
					vm.add = true;
					vm.model = {};
				}

				function onNext(data) {
					vm.model = data;
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
				var fn;
				if (vm.add) {
					fn = rx.Observable.fromCallback(catalogDaoFactory.add);
				} else {
					fn = rx.Observable.fromCallback(catalogDaoFactory.save);
				}
				fn(vm.model, feedback).subscribe(onNext, onError);

				function onNext(ref) {
					// $log.debug('saved:');
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
