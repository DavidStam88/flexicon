/**
 * Created by david on 19-05-14.
 */

"use strict";
var flexiconApp = angular.module("flexiconApp", ["ngResource"]);

flexiconApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'paginas/home.html',
        controller: homeController
    });

    $routeProvider.when('/inzending/:id', {
        templateUrl: 'paginas/inzending.html',
        controller: inzendingController
    });

    $routeProvider.when('/zoeken/:id', {
        templateUrl: 'paginas/zoeken.html',
        controller: zoekenController
    });

    $routeProvider.when('/reacties/inzending/:id', {
        templateUrl: 'paginas/reacties.html',
        controller: reactiesController
    });

    $routeProvider.when('/account/:id', {
        templateUrl: 'paginas/account.html',
        controller: 'accountController'
    });

    $routeProvider.when('/account/:mis/:id', {
        templateUrl: 'paginas/account.html',
        controller: 'accountController'
    });

    $routeProvider.when('/mijnFlexies/:id', {
        templateUrl: 'paginas/mijnFlexies.html',
        controller: mijnFlexiesController
    });

    $routeProvider.when('/favorieten/:id', {
        templateUrl: 'paginas/favorieten.html',
        controller: favorietenController
    });

    $routeProvider.when('/login', {
        templateUrl: 'paginas/login.html',
        controller: loginController
    });

    $routeProvider.when('/orderByFlexpoints', {
        templateUrl: "paginas/home.html",
        controller: orderByFlexpointsController
    });

    $routeProvider.when('/orderByAlphabet', {
        templateUrl: "paginas/home.html",
        controller: orderByAlphabetController
    });

    $routeProvider.when('/woordenboek', {
        templateUrl: "paginas/woordenboek.html",
        controller: woordenboekController
    });

    $routeProvider.when('/woord/:id', {
        templateUrl: "paginas/woord.html",
        controller: woordController
    });

    $routeProvider.when('/logout', {
        templateUrl: 'paginas/logout.html',
        controller: logoutController
    });

    $routeProvider.otherwise({
        redirectTo: "/home"
    });

    $routeProvider.when('/video', {
        templateUrl: 'paginas/video.html',
        controller: videoController
    });
}]);

