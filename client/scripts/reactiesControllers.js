/**
 * Created by david on 07-06-14.
 */

var reactiesController = function ($scope, $window, $routeParams, dbService, inzendingenService, flexpointService, favorietenService) {
    
    /**
        Dit zijn een aantal globale variabelen die worden gevuld met data als deze word gevonden.
        Deze variabelen zijn globaal omdat deze door veel functies binnen deze controller gebruikt w
        orden en zo niet de hele tijd meegegeven te hoeven worden
        @achtergrondBoodschap : wordt gebruikt om de achtergronden van de reacties van kleur te wisselen
        @gebruikerId          : het id van de huidige ingelogde gebruiker
        @inzending            : hier zitten de gegeven van de geselecteerde inzending in
        @reactie              : een lijst waar alle reacties die geplaatst zijn op de geselecteerde inzending
    */
    var achtergrondBoodschap = false,
        gebruikerId,
        inzending,
        reacties,

        /**
            Deze functie zoekt de huidige gebruiker
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        getGebruiker = function () {
            dbService.gebruikers.get({id : gebruikerId}, function (resp) {
                $scope.gebruiker = resp.data;
            });
        },

        /**
            Deze functie zoekt op of er op dit moment een gebruiker is ingelogd
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        checkOfIngelogd = function () {
            dbService.login.get(function (resp) {
                if (resp.ingelogd) {
                    gebruikerId = resp.gebruikerId;
                    getGebruiker();
                }
            });
        },

        /**
            Deze functie veranderd de kleur van de reacties om en om naar tussen lichtgrijs en grijs.
            Dit wordt gedaan om de leesbaarheid te verbeteren
        */
        setBoodschapAchtergronden = function () {
            var i;
            for (i = 0; i < $scope.reacties.length; i += 1) {
                if (achtergrondBoodschap) {
                    $scope.reacties[i].achtergrondKleur =  { backgroundColor : '#EEE' };
                } else {
                    $scope.reacties[i].achtergrondKleur =  { backgroundColor : '#CCC' };
                }
                achtergrondBoodschap = !achtergrondBoodschap;
            }
        },

        /**
            Deze functie zoekt in de globale lijst van reactie of er reacties tussen zitten van de huidige gebruiker.
            Als deze gevonden worden wordt er een kruisje getoont waarmee de reactie verwijderd kan worden
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        selecteerEigenReacties = function () {
                setReactie = function (nummer) {
                    $scope.reacties[nummer].kruisje = {'visibility' :"visible"};
                },
                checkOfGebruikerReactiesHeeft = function () {
                    var i;
                    for (var i = 0; i < reacties.length; i += 1) {
                        if (reacties[i].gebruikerId === gebruikerId) {
                            setReactie(i);
                        }
                    }
                },
                checkOfIngelogd = function () {
                    dbService.login.get(function (resp) {
                        if (resp.ingelogd) {
                            gebruikerId = resp.gebruikerId;
                            checkOfGebruikerReactiesHeeft();
                            getGebruiker();
                        }
                    });
                }
            checkOfIngelogd();
        },

        /**
            Deze functie zoekt bij elke reactie de bijbehorende gebruiker
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        zoekBijbehorendeGebruiker = function () {
            var checkOfKlaar = function (nummer) {
                    if (nummer >= reacties.length - 1) {
                        selecteerEigenReacties();
                        $scope.reacties = reacties;
                        $scope.predicate = "-datum";
                        $scope.reverse = false;
                        setBoodschapAchtergronden();
                    }
                },
                zoekGebruiker = function (gebruikerId, nummer) {
                    dbService.gebruikers.get({id : gebruikerId}, function (resp) {
                        if (resp.data) {
                            reacties[nummer].gebruiker = resp.data;
                            checkOfKlaar(nummer);
                        }
                    });
                },
                filterReacties = function () {
                    var i;
                    for (i = 0; i < reacties.length; i += 1) {
                        zoekGebruiker(reacties[i].gebruikerId, i);
                    }
                };
            filterReacties();
        },

        /**
            Deze functie zoekt de reacties die zijn geplaats op de geselecteerde inzending en 
            toont deze op het scherm
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        zoekReacties = function () {
            reacties = [];
            dbService.reacties.get({id : inzending._id}, function (resp) {
                if (resp.data) {
                    reacties = resp.data;
                    if (reacties.length === 0) {
                        $scope.reacties = reacties;
                    } else {
                        zoekBijbehorendeGebruiker();
                    }
                }
            });

        },

        /**
            Deze functie zoek naar de geselecteerde inzending en haalt hier de gegevens van op 
            en toont deze op de pagina
            @resp     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                        een message (of de actie geslaagd is of niet)
        */
        zoekInzending = function () {
            dbService.inzendingReacties.get({id : $routeParams.id}, function (resp) {
                if (resp.data) {
                    inzending = resp.data;
                    inzendingenService.zoekGegevensInzending(inzending, function (inzendingx) {
                        console.log(inzendingx.styleHartje);
                        $scope.inzending = inzendingx;
                        zoekReacties();
                    });
                }
            });
        };
    zoekInzending();
    checkOfIngelogd();

    /**
        Deze functie maakt het mogenlijk om een inzending op de homepagina 
        toe te voegen aan een gebruiker zijn favorieten
        @param inzendingId : het id van de aan favorieten toe te voegen inzending
    */ 
    $scope.addFavorite = function (inzendingId) {
        favorietenService.manageFavoriet(inzendingId, function (resp) {
            toonMessage(resp.message);
            zoekInzending();
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
            zoekInzending();
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
            zoekInzending();
        });
    };

    /**
        Deze functie creert een nieuwe reactie als de inhoud ervan niet leeg is 
        gelaten en de gebruiker is ingelogd
        @param boodschap : de inhoud van de reactie
    */
    $scope.plaatsBericht = function (boodschap) {
        var stuurBoodschap = function () {
                dbService.reactiesInzending.post(boodschap, function (resp) {
                    toonMessage(resp.message);
                    zoekInzending();
                });
            },
            checkOfIngelogd = function () {
                dbService.login.get(function (resp) {
                    if (resp.ingelogd) {
                        boodschap.gebruikerId = resp.gebruikerId;
                        boodschap.inzendingId = $routeParams.id;
                        stuurBoodschap();
                    } else {
                        $window.location = "/#/login";
                    }
                });
            }
        if (boodschap) {
            checkOfIngelogd();
        }
    };

    /**
        Deze functie verwijderd een door de huidige gebruiker geplaatste reactie
        @param id : het id van de te verwijderen reactie
    */
    $scope.verwijderReactie = function (id) {
        dbService.reactiesInzending.delete({id : id}, function (resp) {
            toonMessage(resp.message);
            zoekInzending();
        });
    };
    $scope.setAchtergrond = {
        opacity : 1
    };
};