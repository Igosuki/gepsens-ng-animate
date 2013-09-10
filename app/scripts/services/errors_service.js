angular.module('meanApp.services')
  .factory('errors', function () {
    return {
      handle : function ($scope, $location, $routeParams, response) {
          switch (response.status) {
              case 404: // resource not found - return to the list and display message returned by the controller
                  $location.path($routeParams.domain+'/list');
                  break;
              case 409: // optimistic locking failure - display error message on the page
                  $scope.message = {level: 'error', text: response.data.message};
                  break;
              case 400:
              case 422: // validation error - display errors alongside form fields
                  $scope.errors = response.data.errors;
                  break;
              default: // TODO: general error handling
          }
      }
    }
  });
