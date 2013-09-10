angular.module('meanApp.controllers')
  .controller('MainCtrl', function ($rootScope, $scope, $dialog, $location, Auth) {

    $rootScope.debugMode = true;
    $rootScope.location = $location;
    $scope.home = function () {
      if (Auth.isAuthenticated()) {
        $location.path('/main');
      } else {
        $location.path('/landing');
      }
    };
    $scope.login = function() {
        Auth.login($scope.login.email, $scope.login.password, function(user) {
          if(user) {
            $scope.user = user;
            $scope.user.isLoggedIn = true;
            window.location.href='#/dashboard';
            delete $scope.login;
          } else {
            
          }
        });
    };
    $scope.logout = function() {
        Auth.logout();
        delete $scope.user;
        $location.path('/landing');
    };
    $scope.loginOauth = function(type) {
      Auth.loginOauth(type, function(result) {
        $scope.user = result;
      });
    };
    $scope.changePassword = function(userId, password) {
      $http.put('/users/'+userId, {password: password}).success(function(res) {console.log(res);});
    }

    Auth.requestCurrentUser(function(result) {
      $scope.user = result;
      console.log(result);
    });
  }).controller('CollapseCtrl', function($scope) {
    $scope.isCollapsed = true;
  });