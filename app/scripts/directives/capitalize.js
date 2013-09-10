angular.module('meanApp.directives')
	.filter('capitalize', function() {
		return function(string) {
			return string.substring(0, 1).toUpperCase() + string.substring(1);
		}
	});