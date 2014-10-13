/**
 * Created by david on 17-06-14.
 */

var zoekenController = function ($scope, $routeParams, dbService, $window, inzendingenService, favorietenService, flexpointService) {
        var zoekInzendingen = function () {
            dbService.zoekResultaten.get({id: $routeParams.id}, function (inzendingenG) {
                if (inzendingenG.data) {
                    inzendingenService.setInzendingen(inzendingenG.data, function (resp) {
                        $scope.inzendingen = resp;
                        $scope.predicate = '-datum';
                        $scope.reverse = false;
                    });
                }
            });
        }

    /**
     Deze functie maakt het mogenlijk om een inzending op de homepagina
     toe te voegen aan een gebruiker zijn favorieten
     @param inzendingId : het id van de aan favorieten toe te voegen inzending
     */
    $scope.addFavorite = function (inzendingId) {
        favorietenService.manageFavoriet(inzendingId, function (resp) {
            toonMessage(resp.message);
            zoekInzendingen();
        });
    };

    /**
     Deze functie maakt het mogenlijk om op een inzending op de homepagina
     te stemmen
     @param inzendingId : het id van de inzending waar de gebruiker op wilt stemmen
     */
    $scope.addFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(inzendingId, 'plus', function (resp) {
            toonMessage(resp.message);
            zoekInzendingen();
        });
    };

    /**
     Deze functie maakt het mogenlijk om tegen een inzending op de homepagina
     te stemmen
     @param inzendingId : het id van de inzending waar de gebruiker tegen wilt stemmen
     */
    $scope.minFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(inzendingId, 'min', function (resp) {
            toonMessage(resp.message);
            zoekInzendingen();
        });
    };
    zoekInzendingen();
    $scope.woord = $routeParams.id;
}