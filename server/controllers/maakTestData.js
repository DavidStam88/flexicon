/**
 * Created by david on 09-06-14.
 */
var Flexicon = require('../databaseModels/flexicon.js'),
    Gebruiker = require('../databaseModels/gebruiker.js'),
    Thema = require('../databaseModels/thema.js'),
    Afbeelding = require('../databaseModels/afbeelding.js'),
    Lettertype = require('../databaseModels/lettertype.js'),
    Woord = require('../databaseModels/woordenboek.js'),
    Reactie = require('../databaseModels/reactie.js'),
    Inzending = require('../databaseModels/inzending.js'),
    Woordenboek = require('../databaseModels/woordenboek.js'),

    geefRandomId = function (array) {
        var random = Math.round(Math.random() * (array.length - 1));
        return array[random];
    },

    geefFlexpoints = function () {
        var random = Math.round(Math.random() * (4000));
        return random;
    },
    geefDefinitie = function () {
        var array = ["Tof", "Swag", "Saltdaddy", "Magnum", "Levantje", "Whitsky", "Acuente", "Torro", "Marty",
            "Vet", "Hard", "Leyp", "Gruwtje", "Calipy", "Landsky", "Mendez", "Rockhard", "Fanato", "Meui", "Yolo",
            "Vorm", "Gans", "Lenvs", "Kemp", "Goudhaantje"];
        var random = Math.round(Math.random() * (array.length - 1));
        return array[random];
    },
    geefToelichitng = function () {
        return "Is toch een leuk woord?";
    },
    geefLetterGrootte = function () {
        return Math.round(Math.random() * 10) + 65;
    },
    filterIds = function (array) {
        var i,
            ids = [];
        for (i = 0; i < array.length; i += 1) {
            ids[ids.length] = array[i]._id;
        }
        return ids;
    },
    geefBoodschap = function () {
        return "Leuke inzending man! Flexpoints voor deze!";
    },
    maakReactie = function (inzendingId) {
        var reactie,
            gebruikerId,
            slaOp = function (callback) {
                reactie.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback();
                    } else {
                        callback(data);
                    }
                });
            },
            maakReactie = function () {
                reactie = new Reactie();
                reactie.boodschap = geefBoodschap();
                reactie.gebruikerId = gebruikerId;
                reactie.inzendingId = inzendingId;
                slaOp(function (resp) {

                });
            },
        getRandomGebruikerId = function () {
            var ids = [],
                getGebruikers = function () {
                    Gebruiker.find(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            ids = filterIds(data);
                            gebruikerId = geefRandomId(ids);
                            maakReactie();
                        }
                    });
                }
            getGebruikers();
        };
        getRandomGebruikerId();
    },
    maakFlexicon = function (woord) {
    var inzending,
        gebruikerId,
        themaId,
        lettertypeId,
        afbeeldingId,
        maakReacties = function (inzendingId) {
            var i;
            for (i = 0; i < 10; i += 1) {
                maakReactie(inzendingId);
            }
        },
        slaOp = function (callback) {
            inzending.save(function (err, data) {
                if (err) {
                    console.log(err);
                    callback();
                } else {
                    callback(data);
                }
            });
        },
        maakInzending = function () {
            inzending = new Flexicon();
            inzending.gebruikerId = gebruikerId;
            inzending.themaId = themaId;
            inzending.video = "Dit wordt een video";
            inzending.origineelId = woord._id;
            inzending.definitie = geefDefinitie();
            inzending.toelichting = geefToelichitng();
            inzending.lettertypeId = lettertypeId;
            inzending.lettergrootte = geefLetterGrootte();
            inzending.afbeeldingId = afbeeldingId;
            inzending.flexpoints = geefFlexpoints();
            inzending.tags = woord.tags;
            slaOp(function (resp) {
                maakReacties(resp._id);
            });
        },
        getRandomThemaId = function () {
            var ids = [],
                getThemas = function () {
                    Thema.find(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            ids = filterIds(data);
                            themaId = geefRandomId(ids);
                            maakInzending();
                        }
                    });
                };
            getThemas();
        },
        getRandomAfbeeldingId = function () {
            var ids = [],
                getAfbeeldingen = function () {
                    Afbeelding.find(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            ids = filterIds(data);
                            afbeeldingId = geefRandomId(ids);
                            getRandomThemaId();
                        }
                    });
                };
            getAfbeeldingen();
        },
        getRandomLettertypeId = function () {
            var ids = [],
                getLettertypes = function () {
                    Lettertype.find(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            ids = filterIds(data);
                            lettertypeId = geefRandomId(ids);
                            getRandomAfbeeldingId();
                        }
                    });
                };
            getLettertypes();
        },
        getRandomGebruikerId = function () {
            var ids = [],
                getGebruikers = function () {
                Gebruiker.find(function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        ids = filterIds(data);
                        console.log(ids);
                        gebruikerId = geefRandomId(ids);
                        getRandomLettertypeId();
                    }
                });
            }
            getGebruikers();
        };
        getRandomGebruikerId();
    },
    maakInzending = function (woord) {
        var inzending,
            gebruikerId,
            themaId,
            lettertypeId,
            afbeeldingId,
            maakReacties = function (inzendingId) {
                var i;
                for (i = 0; i < 10; i += 1) {
                    maakReactie(inzendingId);
                }
            },
            slaOp = function (callback) {
                inzending.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback();
                    } else {
                        callback(data);
                    }
                });
            },
            maakInzending = function () {
                inzending = new Inzending();
                inzending.gebruikerId = gebruikerId;
                inzending.themaId = themaId;
                inzending.video = "Dit wordt een video";
                inzending.origineelId = woord._id;
                inzending.definitie = geefDefinitie();
                inzending.toelichting = geefToelichitng();
                inzending.lettertypeId = lettertypeId;
                inzending.lettergrootte = geefLetterGrootte();
                inzending.afbeeldingId = afbeeldingId;
                inzending.flexpoints = geefFlexpoints();
                inzending.tags = woord.tags;
                slaOp(function (resp) {
                    maakReacties(resp._id);
                });
            },
            getRandomThemaId = function () {
                var ids = [],
                    getThemas = function () {
                        Thema.find(function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                ids = filterIds(data);
                                themaId = geefRandomId(ids);
                                maakInzending();
                            }
                        });
                    };
                getThemas();
            },
            getRandomAfbeeldingId = function () {
                var ids = [],
                    getAfbeeldingen = function () {
                        Afbeelding.find(function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                ids = filterIds(data);
                                afbeeldingId = geefRandomId(ids);
                                getRandomThemaId();
                            }
                        });
                    };
                getAfbeeldingen();
            },
            getRandomLettertypeId = function () {
                var ids = [],
                    getLettertypes = function () {
                        Lettertype.find(function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                ids = filterIds(data);
                                lettertypeId = geefRandomId(ids);
                                getRandomAfbeeldingId();
                            }
                        });
                    };
                getLettertypes();
            },
            getRandomGebruikerId = function () {
                var ids = [],
                    getGebruikers = function () {
                        Gebruiker.find(function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                ids = filterIds(data);
                                gebruikerId = geefRandomId(ids);
                                getRandomLettertypeId();
                            }
                        });
                    }
                getGebruikers();
            };
        getRandomGebruikerId();
    },
    zoekWoordVoorInzendingen = function () {
        var vandaag = new Date(),
            woord,
            woorden = [],
            maakInzendingen = function () {
               var i;
                for (i = 0; i < 10; i += 1) {
                    maakInzending(woord);
                }
            },
            selecteerWoord = function () {
                var i;
                for (i = 0; i < woorden.length; i += 1) {
                    if (vandaag >= woorden[i].startDatum && vandaag <= woorden[i].eindDatum) {
                        woord = woorden[i];
                    }
                }
                maakInzendingen();
            },
            zoekAlleWoorden = function () {
                Woordenboek.find(function (err, book) {
                    if (err) {
                        console.log(err);
                    }
                    woorden = book;
                    selecteerWoord();
                });
            };
        zoekAlleWoorden();
    },
    zoekWoordenVoorflexicons = function () {
    var vandaag = new Date(),
        woorden = [],
        woordenFilter = [],
        maakFlexicons = function () {
            var i;
            for (i = 0; i < woordenFilter.length; i += 1){
                maakFlexicon(woordenFilter[i]);
            }
        },
        selecteerWoorden = function () {
            var i;
            for (i = 0; i < woorden.length; i += 1) {
                if (woorden[i].eindDatum < vandaag) {
                    woordenFilter[woordenFilter.length] = woorden[i];
                }
            }
            maakFlexicons();
        },
        zoekAlleWoorden = function () {
            Woordenboek.find(function (err, book) {
                if (err) {
                    console.log(err);
                } else {
                    woorden = book;
                    selecteerWoorden();
                }
            });
        };
    zoekAlleWoorden();
}


exports.maakFlexicons = function (req, res) {
    zoekWoordenVoorflexicons();
    res.send("Gelukt");
}

exports.maakInzendingen = function (req, res) {
    zoekWoordVoorInzendingen();
    res.send("Gelukt");

}