angular.module('meanApp.directives', [])
	.directive('perspWindow', [function () {
		return {
			templateUrl: 'views/directives/perspwindow.html',
			replace: true,
			transclude: true,
			restrict: 'A',
			scope: {},
			controller: function($scope, $element, $attrs, $transclude) {
				
			},
			link: function postLink(scope, iElement, iAttrs) {
				
			}
		};
	}])
	.directive('smallWindow', [function () {
		return {
			templateUrl: 'views/directives/smallwindow.html',
			replace: true,
			transclude: true,
			restrict: 'A',
			scope: {},
			controller: function($scope, $element, $attrs, $transclude) {
				
			},
			link: function postLink(scope, iElement, iAttrs) {
	
			}
		};
	}])
	.directive('gRotate', [function () {
		return {
			restrict: 'A',
			scope : {
				gRotate: '=',
				gRotateTrigger: '='
			},
			template: '<div ng-transclude></div>',
			replace: false,
			transclude: true,
			controller: function($scope, $element, $attrs, $transclude, $timeout) {
				var gRotate = $scope.gRotate;
				var rotate = function() {
					gRotate.x = (gRotate.x + 10) % 360;
					gRotate.y = (gRotate.y + 10) % 360;
					gRotate.z = (gRotate.z + 10) % 360;
					update();
				};
				var update = function() {
					$element.css('transform', 'rotateX('+gRotate.x+'deg) rotateY('+gRotate.y+'deg) rotateZ('+gRotate.z+'deg)')
				}
				var currentTimeout = null;
				function startLoop() {
					$timeout(function loop() {
						rotate();
						currentTimeout = $timeout(loop, 50);
					}, 50, true);				
				}
				$scope.$watch('gRotateTrigger', function(newVal, oldVal) {
					if(newVal != oldVal) {
						if(newVal) {
							startLoop();
						} else {
							$timeout.cancel(currentTimeout);
							gRotate = {x: 0, y: 0, z: 0};
							update();
						}
					}
				});
			},
			link: function postLink(scope, iElement, iAttrs, $timeout) {

			}
		};
	}]);