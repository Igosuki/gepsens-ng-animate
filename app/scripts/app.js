angular.module('meanApp', ['meanApp.controllers', 'meanApp.services', 'meanApp.directives', 'meanApp.filters', 'ui.utils', 'ui.bootstrap', 'ngResource', 'gepsens', 'ngCookies', 'ngRoute', 'ajoslin.promise-tracker'])
    .config(function ($routeProvider, $httpProvider, $locationProvider, $provide, $cookiesProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run( function($rootScope, $location, Auth) {

    });
    
