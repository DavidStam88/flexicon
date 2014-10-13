/**
 * Created by david on 07-06-14.
 */

var mijnFlexiesController = function ($scope, $routeParams, $window, dbService, favorietenService, flexpointService, inzendingenService) {
    var inzendingen = [],
        inzendingenGegevens = [],
        gebruiker,
    getInzendingen = function () {
        dbService.inzendingenGebruiker.get({id : gebruiker._id}, function (resp) {
            if (resp.data.length > 0) {
                inzendingenService.setInzendingen(resp.data, function (resp) {
                    $scope.inzendingen = resp;
                    $scope.predicate = '-datum';
                    $scope.reverse = false;
                });
            } else {
                $scope.inzendingen = [];
            }
        });
    },
    getGebruiker = function () {
        inzendingen = [];
        inzendingenGegevens = [];
        dbService.gebruikers.get({id : $routeParams.id}, function (resp) {
            if (resp.data) {
                gebruiker = resp.data;
                $scope.gebruiker = gebruiker;
                getInzendingen();
            }
        });
    };
    getGebruiker();

    $scope.verwijderFlexie = function (inzendingId) {
        dbService.inzending.delete({id : inzendingId}, function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };

    $scope.addFavorite = function (inzendingId) {
        favorietenService.manageFavoriet(inzendingId, function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };

    $scope.addFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(inzendingId, 'plus', function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };
    $scope.minFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(dbService, inzendingId, 'min', function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };
};