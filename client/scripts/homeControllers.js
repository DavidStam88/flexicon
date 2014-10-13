/**
 * Created by david on 19-05-14.
 */

var homeController = function ($scope, dbService, inzendingenService, $window, favorietenService, flexpointService) {
    /**
     Deze functie zoekt naar inzendingen die als origineel woord het
     huidige woord van de week hebben en vult de globale variabel 'inzendingen'
     met de id hiervan
     @woordId : het id van het woord van de week
     */
    zoekInzendingen = function (woordId) {
        dbService.inzendingenWoord.get({id: woordId}, function (inzendingenG) {
            if (inzendingenG.data) {
                inzendingenService.setInzendingen(inzendingenG.data, function (resp) {
                    $scope.inzendingen = resp;
                    $scope.predicate = '-datum';
                    $scope.reverse = false;
                });
            }
        });
    },
    /**
     Deze functie zoekt naar het woord van de week en geeft deze weer in de header
     op de home pagina
     */
        zoekWoordVanDeWeek = function () {
            dbService.woordenboek.get(function (woord) {
                if (woord.data) {
                    $scope.woord = woord.data;
                    zoekInzendingen(woord.data._id);
                }
            });
        };

    /**
     Deze functie stuurt de gebruiker door naar de inzending creeren pagina
     */
    $scope.doeVoorstel = function () {
        $window.location = "/#/inzending/" + $scope.woord._id;
    };

    /**
     Deze functie maakt het mogenlijk om een inzending op de homepagina
     toe te voegen aan een gebruiker zijn favorieten
     @param inzendingId : het id van de aan favorieten toe te voegen inzending
     */
    $scope.addFavorite = function (inzendingId) {
        favorietenService.manageFavoriet(inzendingId, function (resp) {
            toonMessage(resp.message);
            zoekWoordVanDeWeek();
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
            zoekWoordVanDeWeek();
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
            zoekWoordVanDeWeek();
        });
    };
    zoekWoordVanDeWeek();
};