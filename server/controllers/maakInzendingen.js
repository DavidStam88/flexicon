/**
 * Created by david on 02-06-14.
 */

var Inzending = require('../databaseModels/inzending.js'),
    Gebruiker = require('../databaseModels/gebruiker.js'),
    Thema = require('../databaseModels/thema.js'),
    Afbeelding = require('../databaseModels/afbeelding.js'),
    Lettertype = require('../databaseModels/lettertype.js'),
    Woord = require('../databaseModels/woordenboek.js'),
    Reactie = require('../databaseModels/reactie.js'),
    slaInzendingOp = function (inzending, callback) {
        inzending.save(function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    maakReacties = function (inzending) {
        var gebruikerIds = [],
            geefRandomId = function (array) {
                var random = Math.round(Math.random() * (array.length - 1));
                return array[random];
            },
            slaReactieOp = function (reactie) {
                console.log("5");
                reactie.save(function (err, reactie) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Hier " + reactie._id);
                });
            },
            maakReactie = function () {
                var reactie = new Reactie();
                reactie.gebruikerId = geefRandomId(gebruikerIds);
                reactie.inzendingId = inzending._id;
                reactie.boodschap = "Dit is een leuke inzending man! Flexpoints voor deze!";
                slaReactieOp(reactie);
            },
            maakReactietjes = function () {
                var i;
                for (i = 0; i < 6; i += 1) {
                    maakReactie();
                }
            },
            vulGebruikersIds = function (gebruikers) {
                var i;
                for (i = 0; i < gebruikers.length; i += 1) {
                    gebruikerIds[gebruikerIds.length] = gebruikers[i]._id;
                }
                maakReactietjes();
            },
            haalGebruikersOp = function () {
                Gebruiker.find(function (err, gebruikers) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    vulGebruikersIds (gebruikers);
                });
            };
        haalGebruikersOp();
    },

    maakInzending = function (gebruikerId, themaId, video, origineelId, definitie, toelichting, lettertypeId, lettergrootte, afbeeldingId, flexpoints, tags) {
        var inzending = new Inzending();
        inzending.gebruikerId = gebruikerId;
        inzending.themaId = themaId;
        inzending.video = video;
        inzending.origineelId = origineelId;
        inzending.definitie = definitie;
        inzending.toelichting = toelichting;
        inzending.lettertypeId = lettertypeId;
        inzending.lettergrootte = lettergrootte;
        inzending.afbeeldingId = afbeeldingId;
        inzending.flexpoints = flexpoints;
        inzending.tags = tags;
        slaInzendingOp(inzending, function (res) {
            maakReacties(res);
        });
    },
    haalGebruikersOp = function (callback) {
        Gebruiker.find(function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    haalThemasOp = function (callback) {
        Thema.find(function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    haalLettertypesOp = function (themaId, callback) {
        Lettertype.find({themaId: themaId}, function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    haalAfbeeldingenOp = function (themaId, callback) {
        Afbeelding.find({themaId: themaId}, function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    haalWoordenOp = function (callback) {
        Woord.find(function (err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    geefRandomId = function (array) {
        var random = Math.round(Math.random() * (array.length - 1));
        return array[random];
    },
    vangIds = function (array) {
        var ids = [],
            i;
        for (i = 0; i < array.length; i += 1) {
            ids[ids.length] = array[i]._id;
        }
        return ids;
    },
    genereerDefinitie = function () {
        return "Woord";
    },
    genereerToelichting = function () {
        return "Dit is een definitie van dit leipe woord.";
    },
    genereerTags = function () {
        return ["tag 1", "tag 2", "tag 3"];
    },
    genereerRandomBestaandeIds = function () {
        //console.log("Gaat die dan he.");
        var gebruikerId,
            afbeeldingId,
            lettertypeId,
            origineelId,
            themaId,
            setThemaId = function () {
                var themaIds;
                haalThemasOp(function (themas) {
                    themaIds = vangIds(themas);
                    themaId = geefRandomId(themaIds);
                    //console.log(themaId);
                    setAfbeeldingId();
                });
            },
            setAfbeeldingId = function () {
                var afbeeldingIds
                haalAfbeeldingenOp(themaId, function (afbeeldingen) {
                    afbeeldingIds = vangIds(afbeeldingen);
                    afbeeldingId = geefRandomId(afbeeldingIds);
                    //console.log(afbeeldingId);
                    setLettertypeId();
                });
            },
            setLettertypeId = function () {
                var lettertypeIds
                haalLettertypesOp(themaId, function (lettertypes) {
                    lettertypeIds = vangIds(lettertypes);
                    lettertypeId = geefRandomId(lettertypeIds);
                    //console.log(lettertypeId);
                    setOrigineelId();
                });
            },
            setOrigineelId = function () {
                var woordIds
                haalWoordenOp(function (woorden) {
                    woordIds = vangIds(woorden);
                    origineelId = geefRandomId(woordIds);
                    //console.log("Hier " + origineelId);
                    setGebruikerId();
                });
            },
            setGebruikerId = function () {
                var gebruikerIds
                haalGebruikersOp(function (gebruikers) {
                    gebruikerIds = vangIds(gebruikers);
                    gebruikerId = geefRandomId(gebruikerIds);
                    //console.log(gebruikerId);
                    setInzending();
                });
            },
            setInzending = function () {
                maakInzending(gebruikerId, themaId, "Dit wordt een video", origineelId, genereerDefinitie(), genereerToelichting(), lettertypeId, (Math.round(Math.random() * 10) + 65), afbeeldingId, 0, genereerTags());
            };
        setThemaId();
    };
exports.maakInzendingen = function (req, res) {
    var x;
    for (x = 0; x < 200; x += 1) {
        genereerRandomBestaandeIds();
    }
    res.send("Is gelukt baas.");
};