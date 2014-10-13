/**
 * Created by david on 07-06-14.
 */
var favorietenController = function ($scope, $window, dbService, inzendingenService, favorietenService, flexpointService, $routeParams) {
    /**
     Deze variableren zijn globale variabelen. Als bepaalde data gevonden kan worden worden deze varabelen ingevuld.
     Deze zijn globaal zodat deze door meerdere methodes gebruikt kunnen worden zonder deze telkens door te hoeven
     geven
     @gebruiker           : de huidig ingelogde gebruiker
     @inzendingen         : een lijst die wordt gevult met alle id's van de favoriete
     inzendingen van de gebruiker
     @inzendingenGegevens : een lijst die wordt gevult met de daadwerkelijk gegevens
     van de favorite inzendingen van de gebruiker
     */
    var gebruiker,
        inzendingen = [],
        inzendingenGegevens = [],
        getGegevens = function () {
            inzendingenService.setInzendingen(inzendingen, function (resp) {
                $scope.inzendingen = resp;
                $scope.predicate = '-datum';
                $scope.reverse = false;
            });
        },
        /**
         Als de gevonden lijst van favoriete inzendingen niet leeg is wordt de
         functie getGegevens aangeroepen
         @param nummer : de length van de lijst met favoriete inzendingen
         */
        checkOfAlleInzendingen = function (nummer) {
            if (nummer >= gebruiker.favorieten.length) {
                getGegevens();
            }
        },
        /**
         Hier worden de favorieten van de gebruiker opgezocht.
         @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en
         een message (of de actie geslaagd is of niet)
         */
            getInzendingen = function () {
            var i;
            if (gebruiker.favorieten.length > 0) {
                for (i = 0; i < gebruiker.favorieten.length; i += 1) {
                    dbService.inzending.get({id: gebruiker.favorieten[i]}, function (resp) {
                        if (resp.data) {
                            inzendingen[inzendingen.length] = resp.data;
                            checkOfAlleInzendingen(inzendingen.length);
                        }
                    });
                }
            } else {
                $scope.inzendingen = [];
            }
        },
        /**
         Hier wordt de huidige gebruiker opgezocht zodat zijn gegevens op de pagina
         getoont kunnen worden.
         @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en
         een message (of de actie geslaagd is of niet)
         */
            getGebruiker = function () {
            //alert("1");
            inzendingen = [];
            inzendingenGegevens = [];
            dbService.gebruikers.get({id: $routeParams.id}, function (resp) {
                if (resp.data) {
                    gebruiker = resp.data;
                    $scope.gebruiker = gebruiker;
                    getInzendingen();
                }
            });
        };
    getGebruiker();

    /**
     Deze methode wordt uitgevoerd als de gebruiker een inzending wilt toevoegen aan of
     verwijderen van zijn favorieten. Staat de inzending al in zijn/haar favorieten dan wordt
     deze verwijderd is dit niet het geval dan word deze toegevoegd.
     @param inzendingId : het id van de inzending die verwijderd of toegevoegd moet worden
     aan de favorieten
     @window      : het window object wordt meegegeven zodat de gebruiker naar de login pagina
     verwezen kan worden als deze onverwacht uitgelogd is
     @resp        : dit is een object die bestaat uit data (de gevonden gegevens) en
     een message (of de actie geslaagd is of niet)
     */
    $scope.addFavorite = function (inzendingId) {
        favorietenService.manageFavoriet(inzendingId, function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };

    /**
     Deze methode wordt uitgevoerd als de gebruiker op het plus icoon drukt. Eerst wordt gekeken
     of de gebruiker al gestemt heeft op de inzending. Is dit niet het geval dan worden de flexpoint
     van de inzending verhoogd met 1
     @param inzendingId : het id van de inzending waar de gebruiker op wilt stemmen
     @'plus'      : het commando die wordt doorgegeven
     @resp        : dit is een object die bestaat uit data (de gevonden gegevens) en
     een message (of de actie geslaagd is of niet)
     */
    $scope.addFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(inzendingId, 'plus', function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };

    /**
     Deze methode wordt uitgevoerd als de gebruiker op het min icoon drukt. Eerst wordt gekeken
     of de gebruiker al gestemt heeft op de inzending. Is dit niet het geval dan worden de flexpoint
     van de inzending verhoogd met 1
     @param inzendingId : het id van de inzending waar de gebruiker tegen wilt stemmen
     @'min'       : het commando die wordt doorgegeven
     @resp        : dit is een object die bestaat uit data (de gevonden gegevens) en
     een message (of de actie geslaagd is of niet)
     */
    $scope.minFlexpoint = function (inzendingId) {
        flexpointService.geefFlexpoint(inzendingId, 'min', function (resp) {
            toonMessage(resp.message);
            getGebruiker();
        });
    };
};