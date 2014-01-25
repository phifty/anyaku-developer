// initialize highlight.js
hljs.initHighlightingOnLoad();

// initialize google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-40381599-2', 'developer.anyaku.com');
ga('send', 'pageview');

// application
var application = angular.module('main', [ 'ngRoute', 'ngCookies' ]);

application.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', { templateUrl: 'home' }).
        when('/documentation', { templateUrl: 'documentation' }).
        when('/documentation/general/installation', { templateUrl: 'documentation_general_installation' }).
        when('/documentation/general/how-it-works', { templateUrl: 'documentation_general_how_it_works' }).
        when('/documentation/general/security', { templateUrl: 'documentation_general_security' }).
        when('/documentation/operations/create', { templateUrl: 'documentation_operations_create' }).
        when('/documentation/operations/open', { templateUrl: 'documentation_operations_open' }).
        when('/documentation/operations/update', { templateUrl: 'documentation_operations_update' }).
        when('/documentation/operations/search', { templateUrl: 'documentation_operations_search' }).
        when('/documentation/operations/manage-contacts', { templateUrl: 'documentation_operations_manage_contacts' }).
        when('/documentation/operations/manage-sections', { templateUrl: 'documentation_operations_manage_sections' }).
        when('/documentation/operations/subscribe-contact-updates', { templateUrl: 'documentation_operations_subscribe_contact_updates' }).
        when('/documentation/modules/build-in', { templateUrl: 'documentation_modules_build_in' }).
        when('/documentation/modules/create-own', { templateUrl: 'documentation_modules_create_own' }).
        when('/download', { templateUrl: 'download' }).
        when('/contribute', { templateUrl: 'contribute' }).
        otherwise({ redirectTo: '/' });
});

application.directive('tabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: { },
        templateUrl: 'code_tabs',
        controller: function ($scope, $rootScope, $cookies) {
            var panes = $scope.panes = [ ];

            $scope.select = function (pane) {
                angular.forEach(panes, function (p) {
                    p.selected = false;
                });
                pane.selected = true;
                $cookies.selectedLanguage = pane.title;
                $rootScope.$emit('language-select', pane.title);
            };

            $rootScope.$on('language-select', function (event, title) {
                angular.forEach(panes, function (p) {
                    p.selected = (p.title === title);
                });
            });

            this.addPane = function (pane) {
                var selectedLanguage = $cookies.selectedLanguage;
                if (selectedLanguage ? (pane.title === selectedLanguage) : (panes.length === 0)) {
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
