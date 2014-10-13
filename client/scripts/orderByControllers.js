/**
 * Created by david on 09-06-14.
 */

var orderByFlexpointsController = function ($scope, dbService, $window, inzendingenService, flexpointService, favorietenService) {

        /**
        Deze functie zoekt naar inzendingen die als origineel woord het 
        huidige woord van de week hebben en vult de globale variabel 'inzendingen' 
        met de id hiervan
        @woordId : het id van het woord van de week
        */
        var zoekInzendingen = function (woordId) {
            dbService.inzendingenWoord.get({id: woordId}, function (inzendingenG) {
                if (inzendingenG.data) {
                    inzendingenService.setInzendingen(inzendingenG.data, function (resp) {
                        $scope.inzendingen = resp;
                        $scope.predicate = '-flexpoints';
                        $scope.reverse = false;
                    });
                }
            });
        },

        /**
            Deze functie zoekt het woord van de week op en toont deze in de header op de homepagina
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

    /**
        Deze functie stuurt de gebruiker door naar de inzending creeren pagina
    */
    $scope.doeVoorstel = function () {
        $window.location = "/#/inzending/" + $scope.woord._id;
    };
    zoekWoordVanDeWeek();
}

var orderByAlphabetController = function ($scope, dbService, $window, inzendingenService, flexpointService, favorietenService) {
    /**
        Deze functie zoekt naar inzendingen die als origineel woord het 
        huidige woord van de week hebben en vult de globale variabel 'inzendingen' 
        met de id hiervan
        @woordId : het id van het woord van de week
    */
    var zoekInzendingen = function (woordId) {
        dbService.inzendingenWoord.get({id: woordId}, function (inzendingenG) {
            if (inzendingenG.data) {
                inzendingenService.setInzendingen(inzendingenG.data, function (resp) {
                    $scope.inzendingen = resp;
                    $scope.predicate = '-definitie';
                    $scope.reverse = true;
                });
            }
        });
    },

    /**
        Deze functie zoekt het woord van de week op en toont deze in de header op de homepagina
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
    
    /**
        Deze functie stuurt de gebruiker door naar de inzending creeren pagina
    */
    $scope.doeVoorstel = function () {
        $window.location = "/#/inzending/" + $scope.woord._id;
    };
    zoekWoordVanDeWeek();
}
