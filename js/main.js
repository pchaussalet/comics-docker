var app = angular.module('comicsApp', ['ngRoute', 'ngResource', 'ngSanitize'])
    .config(['$routeProvider', '$resourceProvider', '$httpProvider', function ($routeProvider, $resourceProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .when('/publishers', {
                templateUrl: 'views/publishers/list.html',
                controller: 'publishersController',
                reloadOnSearch: false
            })
            .when('/publisher/:id', {
                templateUrl: 'views/publishers/details.html',
                controller: 'publisherController',
                reloadOnSearch: false
            })
            .when('/characters', {
                templateUrl: 'views/characters/list.html',
                controller: 'charactersController',
                reloadOnSearch: false
            })
            .when('/character/:id', {
                templateUrl: 'views/characters/details.html',
                controller: 'characterController',
                reloadOnSearch: false
            })
            .when('/teams', {
                templateUrl: 'views/teams/list.html',
                controller: 'teamsController',
                reloadOnSearch: false
            })
            .when('/team/:id', {
                templateUrl: 'views/teams/details.html',
                controller: 'teamController',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });

        $resourceProvider.defaults.stripTrailingSlashes = false;

        $httpProvider.defaults.cache = true;
    }]);
