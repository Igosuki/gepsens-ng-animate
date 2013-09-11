angular.module('meanApp.controllers')
.controller('AnimationsController', function ($scope) {
	$scope.smallFrames = [
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}},
		{origin:{x:'50%', y:'50%'}}
	];

	$scope.cubeFrames = [
		{rx: 0, ry: 0, rz: 0, tz: 75, color: 'red'},
		{rx: -180, ry: 0, rz: 0, tz: 75, color: 'violet'},
		{rx: 0, ry: 90, rz: 0, tz: 75, color: 'green'},
		{rx: 0, ry: -90, rz: 0, tz: 75, color: 'blue'},
		{rx: 90, ry: 0, rz: 0, tz: 75, color: 'yellow'},
		{rx: -90, ry: 90, rz: 0, tz: 75, color: 'purple'}
	];

	$scope.cubeRotation = {x: 0, y: 0, z: 0};
});
