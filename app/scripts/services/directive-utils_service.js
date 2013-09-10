angular.module('meanApp.services')
	.factory('alertService', function($rootScope) {
	    return {
	        close: function(item) {
	            item.close();
	        }
	    }
	});