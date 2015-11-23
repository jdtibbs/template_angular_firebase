(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtCatalogList', directiveFn);

	directiveFn.$inject = ['baseListControllerService', 'feedbackFactory', 'catalogConstants', 'catalogDaoFactory', '$location', '$log', 'rx'];

	function directiveFn(baseListControllerService, feedbackFactory, catalogConstants, catalogDaoFactory, $location, $log, rx) {
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


			// baseListControllerService.init(vm.props, catalogConstants);

			vm.remove = remove;
			vm.edit = edit;

			vm.feedback = {};
			var feedback = feedbackFactory(vm.feedback);

			// TODO: make a service to build this for all list controllers.

			// RxJS, just tinkering with it.
			var fn = rx.Observable.fromCallback(catalogDaoFactory.syncArray);
			fn(null, feedback).subscribe(onNext, onError);

			function onNext(data) {
				vm.data = data;
			}

			function onError(error) {
				$log.error(error);
				feedback.error(error);
			}

			function edit(key) {
				$location.path(catalogConstants.pathEdit + key);
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
