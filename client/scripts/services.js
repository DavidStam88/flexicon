/**
 * Created by david on 19-05-14.
 */

flexiconApp.service('dbService', function dbService($resource) {
    "use strict";
    var actions = {
            "get": {method: "GET"},
            "post": {method: "POST"},
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "delete": {method: "DELETE"},
            "upload": {method: "POST", headers: {enctype: 'multipart/form-data'}}
        },
        db = {};
    db.gebruikers = $resource("/gebruikers/:id", {}, actions);
    db.wachtwoordVergeten = $resource("/wachtwoordVergeten", {}, actions);
    db.woordenboek = $resource("/woordVanDeWeek", {}, actions);
    db.woord = $resource("/woordenboek/:id", {}, actions);
    db.zoekOpLetter = $resource("/woordenboek/letter/:id", {}, actions);
    db.inzendingReacties = $resource("/inzendingen/:id", {}, actions);
    db.flexiconReacties = $resource("/flexicon/:id", {}, actions);
    db.thema = $resource("/themas/:id", {}, actions);
    db.themas = $resource("/themas", {}, actions);
    db.themaAfbeeldingen = $resource("/afbeeldingen/thema/:id", {}, actions);
    db.lettertypes = $resource("/lettertypes/:id", {}, actions);
    db.lettertype = $resource("/lettertype/:id", {}, actions);
    db.inzending = $resource("/inzendingen/:id", {}, actions);
    db.inzendingenWoord = $resource("/inzendingen/woord/:id", {}, actions);
    db.inzendingenGebruiker = $resource("/inzendingen/gebruiker/:id", {}, actions);
    db.addFavoriet = $resource("/gebruikers/favorieten", {}, actions);
    db.deleteFavoriet = $resource("/gebruikers/:gebruikerId/:inzendingId", {}, actions);
    db.reacties = $resource("/reacties/inzending/:id", {}, actions);
    db.reactiesInzending = $resource("/reacties/:id", {}, actions);
    db.afbeelding = $resource("/afbeelding/:id", {}, actions);
    db.flexpoints = $resource("/flexpoints", {}, actions);
    db.login = $resource("/login", {}, actions);
    db.logout = $resource("/logout", {}, actions);
    db.woorden = $resource("/woordenboek/:id", {}, actions);
    db.flexicon = $resource("/flexicon/woord/:id", {}, actions);
    db.zoekResultaten = $resource("/zoeken/:id", {}, actions);
    return db;
});

flexiconApp.service('loginService', function loginService(dbService) {
    var self = this;
    /**
     Deze functie controleerd of er een gebruiker is ingelogd
     */
    self.checkOfIngelogd = function (callback) {
        dbService.login.get(function (resp) {
            if (resp.ingelogd) {
                callback(resp.gebruikerId);
            } else {
                callback(false);
            }
        });
    };
});

flexiconApp.service('favorietenService', function favorietenService(dbService, $window, loginService) {
    var self = this;
    /**
     Deze functie voegt een inzending toe of verwijderd deze uit de favorieten lijst van de de huidig ingelogde gebruiker
     @param inzendingId : het id van de inzending die toegevoegd of verwijderd moet worden uit de favorieten lijst
     @param window      : het window object wordt meegegeven om de gebruiker naar de login pagina te sturen als
     deze niet is ingelogd
     */
    self.manageFavoriet = function (inzendingId, callback) {
        var inFavorieten = false,
            gebruikerId,
            verwijderen = function () {
                dbService.deleteFavoriet.delete({gebruikerId: gebruikerId, inzendingId: inzendingId}, function (resp) {
                    callback(resp);
                });
            },
            toevoegen = function () {
                dbService.addFavoriet.post({gebruikerId: gebruikerId, inzendingId: inzendingId}, function (resp) {
                    callback(resp);
                });
            },
            checkToevoegenOfVerwijderen = function () {
                if (inFavorieten) {
                    verwijderen();
                } else {
                    toevoegen();
                }
            },
            checkOfIdInFavorieten = function (favorieten) {
                var i;
                for (i = 0; i < favorieten.length; i += 1) {
                    if (favorieten[i] === inzendingId) {
                        inFavorieten = true;
                    }
                }
                checkToevoegenOfVerwijderen();
            },
            getGebruiker = function () {
                dbService.gebruikers.get({id: gebruikerId}, function (resp) {
                    if (resp.data) {
                        checkOfIdInFavorieten(resp.data.favorieten);
                    } else {
                        callback();
                    }
                });
            };
        loginService.checkOfIngelogd(function (resp) {
            if (resp) {
                gebruikerId = resp;
                getGebruiker();
            } else {
                $window.location = "/#/login";
                callback();
            }
        });
    };
});

flexiconApp.service('inzendingenService', function inzendingenService(dbService, loginService) {
    var self = this;

    /**
     Deze functie zoekt alle gegevens op die in een inzending staan.
     */
    self.zoekGegevensInzending = function (inzending, callback) {

        /**
         Deze functie stuurt de inzending met alle gevonden onderdelen terug
         */
        var stuurTerug = function () {
                callback(inzending);
            },

            /**
             Deze functie controleerd of de ingelogde gebruiker de opgegeven inzending in zijn favorieten heeft staan.
             Als dit zo is dan wordt meteen de stijl in inzending gekoppeld
             */
                checkOfInFavorietenGebruiker = function () {
                var favorieten = [],
                    inFavorieten = false,
                    setStyleHartje = function () {
                        if (inFavorieten) {
                            inzending.styleHartje = {'backgroundImage': "url('../images/inzending/add-favorite-hover.png')"};
                        } else {
                            inzending.styleHartje = {'backgroundImage': "url('../images/inzending/add-favorite.png')"};
                        }
                        stuurTerug();
                    },
                    checkOfInfavorieten = function () {
                        var i;
                        for (i = 0; i < favorieten.length; i += 1) {
                            if (favorieten[i] === inzending._id) {
                                inFavorieten = true;
                            }
                        }
                        setStyleHartje();
                    },
                    getFavorieten = function (gebruikerId) {
                        dbService.gebruikers.get({id: gebruikerId}, function (resp) {
                            if (resp.data) {
                                favorieten = resp.data.favorieten;
                                checkOfInfavorieten();
                            } else {
                                stuurTerug();
                            }
                        });
                    };
                loginService.checkOfIngelogd(function (resp) {
                    if (resp) {
                        getFavorieten(resp);
                    } else {
                        stuurTerug();
                    }
                });
            },

            /**
             Deze functie zoekt het originele van de opgegeven inzending,
             en slaat deze op in het inzending variabel
             */
                zoekWoord = function () {
                dbService.woord.get({id: inzending.origineelId}, function (resp) {
                    if (resp.data) {
                        inzending.woord = resp.data.woord;
                        checkOfInFavorietenGebruiker();
                    } else {
                        stuurTerug();
                    }
                });
            },

            /**
             Deze functie zoekt de achtergrond afbeelding van de opgegeven inzending,
             en slaat deze op in het inzending variabel
             */
                zoekAfbeeldingInzending = function () {
                dbService.afbeelding.get({id: inzending.afbeeldingId}, function (resp) {
                    if (resp.data) {
                        inzending.afbeelding = resp.data.path;
                        zoekWoord();
                    } else {
                        stuurTerug();
                    }
                });
            },

            /**
             Deze functie zoekt het lettertype van de opgegeven inzending,
             en slaat deze op in het inzending variabel
             */
                zoekLettertypeInzending = function () {
                dbService.lettertype.get({id: inzending.lettertypeId}, function (resp) {
                    if (resp.data) {
                        inzending.lettertype = {'font-family': resp.data.naam, 'font-size': inzending.lettergrootte + "px"};
                        zoekAfbeeldingInzending();
                    } else {
                        stuurTerug();
                    }
                });
            };
        zoekLettertypeInzending();
    },
        self.setInzendingen = function (inzendingenG, callback) {
            /**
             Dit zijn een aantal globale variabelen die worden gevuld met data als deze word gevonden.
             Deze variabelen zijn globaal omdat deze door veel functies binnen deze controller gebruikt w
             orden en zo niet de hele tijd meegegeven te hoeven worden
             @inzendingen : de lijst met gevonden inzendingen van een woord van de week
             @inzendingenGefilterd : een gefilterde versie van inzendingen
             */
            var inzendingen = inzendingenG,
                inzendingenGefilterd = [],

                /**
                 Deze functie toont de inzendingen op de homepagina
                 */
                    stuurInzendingenTerug = function () {
                    callback(inzendingenGefilterd);
                },

                /**
                 Deze functie controleerd of er wel inzendingen zijn gevonden
                 */
                    checkOfKlaar = function (nummer) {
                    if (nummer >= inzendingen.length - 1) {
                        stuurInzendingenTerug();
                    }
                },

                /**
                 Deze functie zoekt voor alle inzending ids in het globale inzendingen variabel
                 alle gegevens op
                 */
                    setInzendingen = function () {
                    var i;
                    for (i = 0; i < inzendingen.length; i += 1) {
                        self.zoekGegevensInzending(inzendingen[i], function (resp) {
                            inzendingenGefilterd[inzendingenGefilterd.length] = resp;
                            checkOfKlaar(inzendingenGefilterd.length);
                        });
                    }
                };
            setInzendingen();
        }
});

flexiconApp.service('flexpointService', function flexpointService(dbService) {
    var self = this;
    /**
     Deze functie voegt een flexpoint toe of trekt er een af
     @param inzendinId : het id van de inzending waar de flexpoints veranderd moeten worden
     @param richting   : 'plus' voor optellen, 'min' vor aftrekken
     */
    self.geefFlexpoint = function (inzendingId, richting, callback) {
        var object = {
            "inzendingId": inzendingId,
            "flexpoints": richting
        }
        dbService.flexpoints.post(object, function (resp) {
            callback(resp);
        });
    };
});

var veranderHartje = function (favoriet) {
    var achtergrond = favoriet.style.backgroundImage;
    if (achtergrond === "url(http://localhost:3001/images/inzending/add-favorite-hover.png)" || achtergrond === "url('../images/inzending/add-favorite-hover.png')") {
        favoriet.style.backgroundImage = "url('http://localhost:3001/images/inzending/add-favorite.png')";
    } else {
        favoriet.style.backgroundImage = "url('http://localhost:3001/images/inzending/add-favorite-hover.png')";
    }
};

var opac = 0;

var fadeMessageOut = function (timer, opc) {
    var message = document.getElementById("messageVak");
    if (opc <= -1) {
        clearInterval(timer);
        message.style.height = 0 + "px";
        message.style.width = 0 + "px";
        document.getElementById("errorMessage").style.height = 0 + "px";
        document.getElementById("errorMessage").style.width = 0 + "px";
        opac = 0;
    } else {
        message.style.opacity = opc;
    }
}
var verbergMessage = function () {
    var t = setInterval(function () {
        fadeMessageOut(t, opac -= 0.1);
    }, 50);
}

var fadeMessageIn = function (timer, opc) {
    var message = document.getElementById("messageVak");
    if (opc >= 1) {
        clearInterval(timer);
        opac = 1;
        setTimeout(function () {
            verbergMessage();
        }, 2000);
    } else {
        message.style.opacity = opc;
    }
}

var toonMessage = function (message) {
    document.getElementById("errorMessage").style.height = 110 + "px";
    document.getElementById("errorMessage").style.width = 310 + "px";
    document.getElementById("errorMessage").innerHTML = message;
    document.getElementById("messageVak").style.height = 150 + "px";
    document.getElementById("messageVak").style.width = 350 + "px";
    var t = setInterval(function () {
        fadeMessageIn(t, opac += 0.1);
    }, 50);
}
