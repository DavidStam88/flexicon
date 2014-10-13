/* Created by Wessel on 21/05/14 */

var Inzending = require('../../databaseModels/inzending.js'),
    Gebruiker = require('../../databaseModels/gebruiker.js'),
    Flexicon = require('../../databaseModels/flexicon.js'),
    Reactie = require('../../databaseModels/reactie.js'),
    /**
      Het object wat telkens wordt terug gestuurd nadat deze word ingevuld
    */
    maakResponse = function (message, data) {
        return {
            "datumRequest" : Date.now,
            "message" : message,
            "data" : data
        };
    };

/**
    Hier wordt naar één inzending gezocht
    @inzendingId : het id van de inzending waar naar gezocht wordt
*/
exports.getInzending = function (inzendingId, callback) {
    Inzending.findOne({_id : inzendingId}, function (err, inzending) {
       if (err) {
           console.log(err);
           callback(maakResponse("Het zoeken naar een inzending is mislukt.", {}));
           return;
       }
       if (!inzending) {
           Flexicon.findOne({_id : inzendingId}, function (err, resp) {
               if (err) {
                   console.log(err);
                   callback(maakResponse("Het zoeken naar een inzending is mislukt.", {}));
                   return;
               }
               else {
                   callback(maakResponse("Het zoeken naar een inzending is gelukt.", resp));
               }
           });
       } else {
           callback(maakResponse("Het zoeken naar een inzending is gelukt.", inzending));
       }
    });
};

/**
    Hier wordt een inzending gezocht die geplaatst zijn op een bepaald origineel woord
    @woordId : het id van het gezochte origineele woord 
*/
exports.getInzendingenWoord = function (woordId, callback) {
    'use strict';
    Inzending.find({origineelId : woordId}, function (err, inzendingen) {
        if (err) {
            console.log(err);
            callback(maakResponse("Het ophalen van de inzendingen is mislukt", {}));
            return;
        }
        callback(maakResponse("Het ophalen van de inzendingen is gelukt", inzendingen));
    });
};

/**
    Hier wordt gezocht naar alle inzendingen van een bepaalde gebruiker
    @gebruikerId : het id van de gezochte gebruiker
*/
exports.getInzendingenGebruiker = function (gebruikerId, callback) {
    'use strict';
    var gevondenInzendingen = [],
        i,
        zoekInzendingen = function () {
            Inzending.find({gebruikerId : gebruikerId}, function (err, inzendingenZ) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het ophalen van de inzendingen is mislukt", {}));
                    return;
                }
                for (i = 0; i < inzendingenZ.length; i += 1) {
                    gevondenInzendingen.push(inzendingenZ[i]);
                }
                callback(maakResponse("Het ophalen van de inzendingen is gelukt", gevondenInzendingen));
            });
        },
        zoekFlexicons = function () {
            Flexicon.find({gebruikerId : gebruikerId}, function (err, inzendingen) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het ophalen van de inzendingen is mislukt", {}));
                    return;
                }
                gevondenInzendingen = inzendingen;
                zoekInzendingen();
            });
        };
    zoekFlexicons();
};

/**
    Hier wordt een inzending gecreeerd
    @gegevens : de gegevens die uit het ingezonden formulier komen
*/
exports.createInzending = function (gegevens, callback) {
    'use strict';

    var inzending = new Inzending(),
        slaInzendingOp = function () {
            inzending.save(function (err, inzending) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het opslaan van de inzending is mislukt.", {}));
                    return;
                }
                callback(maakResponse("Het opslaan van de inzending is gelukt.", inzending));
            });
        },
        maakInzending = function () {
            inzending.gebruikerId = gegevens.gebruikerId;
            inzending.themaId = gegevens.themaId;
            inzending.origineelId = gegevens.origineelId;
            inzending.definitie = gegevens.definitie;
            inzending.tags = gegevens.tags;
            inzending.toelichting = gegevens.toelichting;
            inzending.lettertypeId = gegevens.lettertypeId;
            inzending.afbeeldingId = gegevens.afbeeldingId;
            inzending.lettergrootte = gegevens.lettergrootte;
            inzending.video = gegevens.video;
            slaInzendingOp();
        },
        validateDefinitie = function () {
            if(!inzending.validateDefinitie(gegevens.definitie)) {
                callback(maakResponse("De definitie is te kort of te lang.", {}));
                return;
            }
            maakInzending();
        },
        validateTags = function () {
            if(!inzending.validateTags(gegevens.tags)) {
                callback(maakResponse("Voeg minimaal 1 tag toe.", {}));
                return;
            }
            validateDefinitie();
        },
        validateLettergrootte = function () {
            if(!inzending.validateLetterGrootte(gegevens.lettergrootte)) {
                callback(maakResponse("De lettercorps is te groot of te klein.", {}));
                return;
            }
            validateTags();
        },
        checkFields = function () {
            if(!inzending.checkFields(gegevens)) {
                callback(maakResponse("Niet alle vereiste velden zijn ingevuld.", {}));
                return;
            }
            validateLettergrootte();
        };
    checkFields();
};

/**
    Hier worden inzendingen gezocht met een bepaalde tag
    @tag : de tag
*/
exports.getInzendingenTag = function (tag, callback) {
    'use strict';
    var inzendingenMetTags = [],
        checkTags = function (inzending) {
            var i;
            for (i = 0; i < inzending.tags.length; i += 1) {
                if (inzending.tags[i].toLocaleLowerCase().indexOf(tag) !== -1) {
                    inzendingenMetTags[inzendingenMetTags.length] = inzending;
                }
            }
        },
        zoekInzendingenMetTags = function (inzendingen) {
            var i;
            for (i = 0; inzendingen.length; i += 1) {
                checkTags(inzendingen[i]);
            }
            callback(maakResponse("Het ophalen van de Flexicons is gelukt.", inzendingenMetTags));
        },
        zoekAlleInzendingen = function () {
            Inzending.find(function (err, book) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
                    return;
                }
                zoekInzendingenMetTags(book);
            });
        };
    zoekAlleInzendingen();
};

/**
    Hier wordt een bepaalde inzending verwijderd
    @inzendingId : het id van de te verwijderen inzending
*/
exports.deleteInzending = function (inzendingId, callback) {
    console.log(inzendingId);
    'use strict';
    var verwijderInzending = function () {
            console.log("Ik ga dus verwijderen he..");
            Inzending.remove({_id : inzendingId}).exec(function (err) {
                if (err) {
                    callback(maakResponse("Het verwijderen van de inzending uit de reacties is mislukt.", {}));
                    return;
                }
                callback(maakResponse("Het verwijderen van de inzending is gelukt.", {}));
            });
    },
    verwijderUitReacties = function () {
        Reactie.remove({inzendingId : inzendingId}).exec(function (err, verwijderd) {
            if (err) {
                callback(maakResponse("Het verwijderen van de inzending uit de reacties is mislukt.", {}));
                return;
            }
            verwijderInzending();
        });
    },
    slaGebruikerOp = function (gebruiker) {
        gebruiker.save(function (err, gebruiker) {
            if (err) {
                console.log(err);
                return;
            } else {
                //console.log(gebruiker);
            }
        });
    },
    verwijderUitFavorieten = function (favorieten) {
        var x;
        for (x = 0; x < favorieten.length; x += 1) {
            if (favorieten[x] === inzendingId) {
                favorieten.splice(x,1);
                verwijderUitFavorieten(favorieten);
            }
        }
        return favorieten;
    },
    checkIedereGebruikersFavorieten = function (gebruikers) {
        var i;
        for (i = 0; i < gebruikers.length; i += 1) {
            gebruikers[i].favorieten = verwijderUitFavorieten(gebruikers[i].favorieten);
            slaGebruikerOp(gebruikers[i]);
        }
        verwijderUitReacties();
    },
    zoekAlleGebruikers = function () {
        Gebruiker.find(function (err, gebruikers) {
            if (err) {
                console.log(err);
                callback(maakResponse("Het zoeken naar alle gebruikers is mislukt.", {}));
                return;
            }
            checkIedereGebruikersFavorieten(gebruikers);
        });
    },
    checkOfInFlexicon = function () {
        Flexicon.findOne({_id : inzendingId}, function (err, flexicon) {
            if (err) {
                console.log(err);
                callback(maakResponse("Het zoeken naar de inzending is mislukt.", {}));
                return;
            }
            if (flexicon) {
                callback(maakResponse("De inzending mag niet worden verwijderd, want het zit in het woordenboek.", {}));
                return;
            }
            zoekAlleGebruikers();
        });
    };
    checkOfInFlexicon();
};

/**
    Hier wordt de flexpoints van een bepaalde inzending aangepast
    @gegevens : het inzendingId en het commando ('plus' of 'min')
*/
exports.geefFlexpoint = function (gegevens, callback) {
    var inzending,
        slaInzendingOp = function () {
            inzending.save(function (err, inzendingData) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het updaten van de inzending is mislukt.", {}));
                    return;
                }
                callback(maakResponse("Je hebt een flexpoint aan " + inzending.definitie + " gegeven. Thnx!", inzendingData));
            })
        },
        geefFlexpoint = function () {
            if (gegevens.flexpoints === "min" && inzending.flexpoints > 0) {
                inzending.flexpoints -= 1;
            } else if (gegevens.flexpoints === "plus") {
                inzending.flexpoints += 1;
            }
            slaInzendingOp();
        },
        checkFields = function () {
            if (!inzending.checkFieldsFlexpoints(gegevens)) {
                callback(maakResponse("Niet alle vereiste velden zijn gegeven.", {}));
                return;
            }
            geefFlexpoint();
        },
        zoekInzending = function () {
            Inzending.findOne({ _id : gegevens.inzendingId }, function (err, gevondenInzending) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het zoeken naar de inzending is mislukt.", {}));
                    return;
                }
                if (!gevondenInzending) {
                    callback(maakResponse("Er is geen inzending gevonden.", {}));
                    return;
                }
                inzending = gevondenInzending;
                checkFields();
            });
        },
        checkOpInzendingId = function () {
            if (!gegevens.inzendingId) {
                callback(maakResponse("Er is geen inzendingId opgegeven.", {}));
                return;
            }
            zoekInzending();
        };
    checkOpInzendingId();
};

/*

 Video = require('../../databaseModels/video.js'),

exports.addVideo = function (video, callback) {
    console.log(video);
    var newVideo = new Video();
    newVideo.video = video;
    newVideo.save(function (err, werkt) {
        callback(maakResponse("Ja leuk", werkt));
    });
}

exports.getVideo = function (callback) {
    Video.find(function (err, data) {
        callback(maakResponse("hier: ", data[4]));
    });
}

    */
