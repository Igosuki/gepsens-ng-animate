angular.module('meanApp.controllers')
.controller('AuthCtrl', function ($scope, Auth) {
 	$scope.userProfile = Auth.currentUser;
});
