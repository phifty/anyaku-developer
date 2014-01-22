// initialize highlight.js
hljs.initHighlightingOnLoad();

// initialize google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-40381599-2', 'simia-tech.github.io');
ga('send', 'pageview');

// application
var application = angular.module('main', [ 'ngRoute', 'ngCookies' ]);

application.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', { templateUrl: 'getting_started' }).
        when('/how-it-works', { templateUrl: 'how_it_works' }).
        when('/security', { templateUrl: 'security' }).
        otherwise({ redirectTo: '/' });
});

application.directive('tabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: { },
        templateUrl: 'code_tabs',
        controller: function ($scope) {
            var panes = $scope.panes = [ ];

            $scope.select = function (pane) {
                angular.forEach(panes, function (p) {
                    p.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function (pane) {
                if (panes.length == 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            }
        }
    };
});

application.directive('pane', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attributes, tabsController) {
            tabsController.addPane(scope);
        },
        templateUrl: 'code_pane'
    };
});
