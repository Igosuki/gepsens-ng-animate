angular.module('meanApp.directives')
  .directive('navMenu', function($location) {
  return function(scope, element, attrs) {
    var links = element.find('a'),
        link,
        currentLink,
        urlMap = {},
        i;

    for (i = 0; i < links.length; i++) {
      link = angular.element(links[i]);
      urlMap[link.attr('href')] = link;
    }

    scope.$on('$routeChangeStart', function() {
      var pathLink = urlMap["#"+$location.path()];

      if (pathLink) {
        if (currentLink) {
          currentLink.parent().removeClass('active');
        }
        currentLink = pathLink;
        currentLink.parent().addClass('active');
      }
    });
  };
});
