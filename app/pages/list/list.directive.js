(function() {
	'use strict';

	angular.module('login.module')
		.directive('jdtList', directiveFn);

	directiveFn.$inject = ['feedbackFactory', 'listConstants', 'listDaoFactory', '$log', '$mdDialog', 'rx'];

	function directiveFn(feedbackFactory, listConstants, listDaoFactory, $log, $mdDialog, rx) {
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller: controllerFn,
			controllerAs: 'vm',
			bindToController: true,
			link: linkFn,
			templateUrl: 'app/pages/list/list.directive.html'
		};

		function controllerFn() {
			var vm = this;
			vm.props.title = listConstants.title;
			vm.feedback = {};
			vm.click = click;

			var feedback = feedbackFactory(vm.feedback);

			// RxJS, just tinkering.
			// useful if callback provided parameter to another function.
			var fn = rx.Observable.fromCallback(listDaoFactory.syncArray);
			fn(null, feedback).subscribe(onNext, onError, onComplete);

			function onNext(data) {
				vm.data = data;
			}

			function onError(error) {
				$log.error(error);
			}

			function onComplete() {
				// $log.debug('rx fromCallbak complete');
			}

			function click(key) {
				$log.debug('clicked: ' + key);
				showDialog();
			}

			function showDialog() {
				var parentEl = angular.element(document.body);
				$mdDialog.show({
					parent: parentEl,
					//targetEvent: $event,
					template: '<md-dialog aria-label="List dialog">' +
						'  <md-dialog-content>' +
						'    <md-list>' +
						'      <md-list-item ng-repeat="item in items">' +
						'       <p>Number {{item}}</p>' +
						'      ' +
						'    </md-list-item></md-list>' +
						'  </md-dialog-content>' +
						'  <div class="md-actions">' +
						'    <md-button ng-click="closeDialog()" class="md-primary">' +
						'      Close Dialog' +
						'    </md-button>' +
						'  </div>' +
						'</md-dialog>',
					locals: {
						//items: $scope.items
					},
					controller: DialogController
				});

				// function DialogController($scope, $mdDialog, items) {
				function DialogController() {
					// $scope.items = items;
					// $scope.closeDialog = function() {
					// $mdDialog.hide();
					// };
				}
			}
		}

		function linkFn(scope, elem, attrs) {}
	}
})();
