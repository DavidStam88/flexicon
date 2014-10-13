/**
 * Created by david on 09-06-14.
 */

var woordenboekController = function ($scope, dbService) {
    var woorden = [],

        /**
            Deze functie toont alle worden op de pagina
            @param nummer : de positie van het item in welke volgorde deze gevonden zijn
        */
        checkOfKlaar = function (nummer) {
            if (nummer >= woorden.length -1) {
                $scope.woorden = woorden;
            }
        },

        /**
            Deze functie zoekt voor het opgegeven woord de afbeelding op
            @param nummer : hiermee wordt, in combinatie met de globale woorden variabele het afbeelding id bepaald
        */
        zoekAfbeelding = function (nummer) {
            dbService.afbeelding.get({ id : woorden[nummer].afbeeldingId }, function (resp) {
                woorden[nummer].afbeelding = resp.data.path;
                checkOfKlaar(nummer);
            });
        },

        /**
            Deze functie voert voor elk woord in woorden de functie voor het vinden van de afbeeldingen uit
        */
        zoekAfbeeldingen = function () {
            var i;
            for (i = 0; i < woorden.length; i += 1) {
                zoekAfbeelding(i);
            }
        },

        /**
            Deze functie zoekt alle woorden in het originele woorden boek een zet deze in de globale variabele
        */
        zoekWoorden = function () {
            woorden = [];
            dbService.woorden.get(function (resp) {
                if (resp.data) {
                    woorden = resp.data;
                    zoekAfbeeldingen();
                }
            });
        };
    zoekWoorden();

        /**
            Deze functie zoekt alle woorden die beginnen met de opgegeven letter. Als deze 
            gevonden worden dan word voor elk woord de afbeeldingen opgezocht en vervolgens 
            worden de woorden getoont op de pagina
            @param letter : de opgegeven letter waarmee de woorden moeten starten
        */
        $scope.zoekOpLetter = function (letter) {
            var woorden = [],
                checkOfKlaar = function (nummer) {
                    if (nummer >= woorden.length -1) {
                        $scope.woorden = woorden;
                    }
                },
                zoekAfbeelding = function (nummer) {
                    dbService.afbeelding.get({ id : woorden[nummer].afbeeldingId }, function (resp) {
                        woorden[nummer].afbeelding = resp.data.path;
                        checkOfKlaar(nummer);
                    });
                },
                zoekAfbeeldingen = function () {
                    var i;
                    for (i = 0; i < woorden.length; i += 1) {
                        zoekAfbeelding(i);
                    }
                },
                zoekWoorden = function () {
                    woorden = [];
                    dbService.zoekOpLetter.get({id : letter}, function (resp) {
                        if (resp.data.length === 0) {
                            $scope.woorden = [];
                        }
                        else if (resp.data.length > 0) {
                            woorden = resp.data;
                            zoekAfbeeldingen();
                        }
                    });
                };
            zoekWoorden();
        };
},
    woordController = function ($scope, $window, dbService, $routeParams, inzendingenService, favorietenService) {
        
        /**
            Deze variabelen zijn globaal gedefineerd. Dit wordt gedaan om te voorkomen dat deze telkens meegegeven moeten worden
        */
        var flexicons = [],
            flexiconsFilter = [],

            /**
                Hier worden de gevonden flexicon opgezocht en in een globale variabele opgeslagen
            */
            zoekFlexicon = function () {
                dbService.flexicon.get({id : $routeParams.id}, function (resp) {
                    if (resp.data) {
                        if (!resp.data.length) {
                            toonMessage("Dit woord volgt in de toekomst en heeft nog geen inzendingen.");
                        }
                        inzendingenService.setInzendingen(resp.data, function (resp) {
                            $scope.inzendingen = resp;
                            flexicons = [];
                            flexiconsFilter = [];
                        });
                    }
                });
            },

            /**
                Deze functie zoekt één specifiek woord op die een bepaald id moet hebben
            */
            zoekWoord = function () {
            dbService.woorden.get({id : $routeParams.id}, function (resp) {
                if (resp.data) {
                    $scope.woord = resp.data;
                    zoekFlexicon();
                }
            });
        };
        zoekWoord();

        /**
            Deze functie maakt het mogenlijk om een inzending op de homepagina 
            toe te voegen aan een gebruiker zijn favorieten
            @param inzendingId : het id van de aan favorieten toe te voegen inzending
        */
        $scope.addFavorite = function (inzendingId) {
            favorietenService.manageFavoriet(inzendingId, function (resp) {
                toonMessage(resp.message);
                zoekWoord();
            });
        };
    }