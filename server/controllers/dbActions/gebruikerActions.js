/**
 * Created by david on 20-05-14.
 */

// Het Mongoose schema waar de actions op uitgevoerd worden.
var Gebruiker = require('../../databaseModels/gebruiker.js'),
    nodemailer = require("nodemailer"),
    Inzending = require('../../databaseModels/inzending.js');

/**
 * Haalt een gebruiker op. Wordt gebruikt als een gebruiker zijn gegevens aan wil passen
 * @param userId        Het userId van de user die gezocht wordt.
 * @param callback      De callback die gebruikt wordt om de ontvangen data terug te sturen.
 *
 * @callback            Als er een gebruiker gevonden wordt, wordt deze gereturned.
 */
var getGebruiker = function (gebruikerId, callback) {
    "use strict";
    console.log(gebruikerId);
    var conditions = {_id: gebruikerId},
        fields = {},
        options = {};
    Gebruiker.findOne(conditions, fields, options).exec(function (err, gebruiker) {
        if (err) {
            callback();
        } else {
            callback(gebruiker);
        }
    });
};

/**
 * Maakt het JSON-antwoord welke teruggestuurd moet worden. Wordt gebruikt bij elke functies die een JSON-object terug sturen.
 * @param message       De boodschap die teruggestuurd moet worden.
 * @param data          De data die meegestuurd kan worden.
 *
 * @return              Het JSON-object wat teruggestuurd kan worden.
 */
var maakResponse = function (message, data) {
    "use strict";
    var resObj = {
        "datumRequest": new Date(),
        "message": message,
        "data": data
    };
    return resObj;
};

/**
 * Zoekt en returned gebruiker met een gegeven e-mailadres. Wordt gebruikt om de te update gebruiker te vinden.
 * @param email         Het e-mail adres van de gebruiker die gezocht wordt.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 *
 * @callback            Als er een gebruiker gevonden wordt, wordt deze gereturned.
 */
var getUserByEmail = function (email, callback) {
    "use strict";
    var conditions = {email: email},
        fields = {},
        options = {};
    Gebruiker.findOne(conditions, fields, options).exec(function (err, gebruiker) {
        if (err) {
            console.log(err);
            callback();
        } else {
            callback(gebruiker);
        }
    });
};

/**
 * Zoekt en returned alle gebruikers.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 *
 * @callback            JSON-object met een message (en de gevonden gebruikers).
 */
exports.getGebruikers = function (callback) {
    "use strict";
    Gebruiker.find(function (err, gebruikers) {
        if (err) {
            callback(maakResponse("Er is iets misgegaan tijdens het zoeken naar gebruikers.", {}));
            return;
        }
        callback(maakResponse("Het zoeken naar gebruikers is gelukt.", gebruikers));
        return;
    });
};
/**
 * Zoekt en returned één gebruiker.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 * @param userId        De userId van de gebruiker die gezocht wordt.
 *
 * @callback            JSON-object met een message (en de gevonden gebruiker).
 */
exports.getGebruiker = function (userId, callback) {
    "use strict";
    if (!userId) {
        callback(maakResponse("Er is geen userId opgegeven.", {}));
        return;
    }
    var conditions = {_id: userId},
        fields = {},
        options = {};
    Gebruiker.findOne(conditions, fields, options).exec(function (err, gebruiker) {
        if (err) {
            callback(maakResponse("Er is iets misgegaan tijdens het zoeken naar een gebruiker.", {}));
            return;
        }
        callback(maakResponse("Het zoeken naar een gebruiker is gelukt.", gebruiker));
        return;
    });
};

/**
 * Controleerd gegevens en maakt een gebruiker als deze valide zijn.
 * @param gegevens      De gegevens van de gebruiker die zich wenst te registreren.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 *
 * @callback            JSON-object met een message (en de gemaakte gebruiker).
 */
exports.createGebruiker = function (gegevens, callback) {
    "use strict";

    // Een object van de gebruiker die gemaakt moet worden.
    var gebruiker = new Gebruiker(),

    //Probeer de nieuwe gebruiker op te slaan in de database.
        slaGebruikerOp = function () {
            gebruiker.save(function (err, data) {
                if (err) {
                    callback(maakResponse("Er is iets misgegaan tijdens het opslaan van de gegevens.", {}));
                    return;
                }
                callback({
                    "datumRequest": new Date(),
                    "message": "Je bent succesvol geregistreerd.",
                    "data": data,
                    "geslaagd" : true
                });
            });
        },

    // Vul het gebruikersobject met de gevalideerde gegevens.
        maakGebruiker = function () {
            gebruiker.email = gegevens.email;
            gebruiker.wachtwoord = gebruiker.generateHash(gegevens.wachtwoord);
            gebruiker.gebruikersnaam = gegevens.gebruikersnaam;
            gebruiker.favorieten = [];
            slaGebruikerOp();
        },

    // Controleer of het gegeven wachtwoord aan de eisen van een wachtwoord voldoet.
        checkWachtwoord = function () {
            if (!gebruiker.checkWachtwoord(gegevens.wachtwoord, gegevens.bevestigWachtwoord)) {
                callback(maakResponse("Het gegeven wachtwoord is niet lang genoeg of komt niet overeen met de bevestiging.", {}));
                return;
            }
            maakGebruiker();
        },
    // Controleer of de opgegeven gebruikersnaam lang genoeg is.
        checkGebruikersnaam = function () {
            if (!gebruiker.checkGebruikersnaam(gegevens.gebruikersnaam)) {
                callback(maakResponse("De opgegeven gebruikersnaam is niet lang genoeg.", {}));
                return;
            }
            checkWachtwoord();
        },
    // Controleer of de gegeven e-mail wel een echt emailadres is.
        checkOfEmailValide = function () {
            if (!gebruiker.checkEmail(gegevens.email)) {
                callback(maakResponse("Het gegeven e-mailadres is niet valide.", {}));
                return;
            }
            checkGebruikersnaam();
        },
    // Controleer of de gegeven email niet al bestaat.
        checkOfEmailBestaat = function () {
            getUserByEmail(gegevens.email, function (gebruiker) {
                if (gebruiker) {
                    callback(maakResponse("Het gegeven e-mail adres bestaat al.", {}));
                    return;
                }
                checkOfEmailValide();
            });
        },
    // Controleer of alle gewenste gegevens gegeven zijn.
        checkFields = function () {
            if (!gebruiker.checkFields(gegevens)) {
                callback(maakResponse("Niet alle velden zijn ingevuld.", {}));
                return;
            }
            checkOfEmailBestaat();
        };
    checkFields();
};

/**
 * Controleerd gegevens en update een gebruiker.
 * @param gegevens      De gegevens die geupdate moeten worden.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 *
 * @callback            JSON-object met een message (en de gemaakte gebruiker).
 */
exports.updateGebruiker = function (gegevens, callback) {
    "use strict";
    // Het object van de gebruiker die geupdate moet worden, deze is nu nog leeg.
    var gebruiker = {},
        setEmailGebruiker = function (email) {
            gebruiker.email = email;
        },
    // Als de gebruiker een nieuw wachtwoord wenst dan wordt deze  met deze methode geset.
        setWachtwoordGebruiker = function (wachtwoord) {
            gebruiker.wachtwoord = gebruiker.generateHash(wachtwoord);
        },
    // Als de nieuwe opgegeven gebruikersnaam aan de eisen voldoet kan deze met deze functie bevestigd worden.
        setGebruikersnaamGebruiker = function (gebruikersnaam) {
            gebruiker.gebruikersnaam = gebruikersnaam;
        },
    // Sla de gebruiker op in de database.
        slaGebruikerOp = function () {
            gebruiker.save(function (err, data) {
                if (err) {
                    callback(maakResponse("Er is iets misgegaan tijdens het opslaan van de gegevens.", {}));
                    return;
                }
                callback(maakResponse("De gebruiker is succesvol geupdate.", data));
                return;
            });
        },
    // Controleer of het gegeven wachtwoord voldoet aan de eisen.
        checkWachtwoord = function () {
            if (!gebruiker.checkWachtwoord(gegevens.nieuwWachtwoord, gegevens.bevestigWachtwoord)) {
                callback(maakResponse("Het gegeven wachtwoord is niet lang genoeg of komt niet overeen met de bevestiging.", {}));
                return;
            }
            setWachtwoordGebruiker(gegevens.nieuwWachtwoord);
            slaGebruikerOp();
        },
    // Controleer of de gebruiker een nieuw wachtwoord wil.
        checkOpNieuwWachtwoord = function () {
            if (gegevens.nieuwWachtwoord) {
                checkWachtwoord();
            } else {
                slaGebruikerOp();
            }
        },
    // Controleer of de opgegeven gebruikersnaam lang genoeg is.
        checkGebruikersnaam = function () {
            if (!gebruiker.checkGebruikersnaam(gegevens.gebruikersnaam)) {
                callback(maakResponse("De opgegeven gebruikersnaam is niet lang genoeg.", {}));
                return;
            }
            setGebruikersnaamGebruiker(gegevens.gebruikersnaam);
            checkOpNieuwWachtwoord();
        },
    // Controleer of het gegeven e-mailadres wel een valide e-mailadres is.
        checkOfEmailValide = function () {
            if (!gebruiker.checkEmail(gegevens.email)) {
                callback(maakResponse("Het gegeven e-mailadres is niet valide.", {}));
                return;
            }
            setEmailGebruiker(gegevens.email);
            checkGebruikersnaam();
        },
    // Controleer of het e-mail niet al in gebruik is.
        checkOfEmailBestaat = function () {
            getUserByEmail(gegevens.email, function (gebruikerMetEmail) {
                if (gebruikerMetEmail) {
                    if (gebruiker._id.toString() !== gebruikerMetEmail._id.toString()) {
                        callback(maakResponse("Het gegeven e-mail adres bestaat al.", {}));
                        return;
                    }
                }
                checkOfEmailValide();
            });
        },
    // Haal de te update gebruiker op uit de database.
        getGebruikerVoorUpdate = function () {
            getGebruiker(gegevens._id, function (gebruikerVoorUpdate) {
                if (!gebruikerVoorUpdate) {
                    callback(maakResponse("Er is geen gebruiker voor een update gevonden.", {}));
                    return;
                }
                gebruiker = gebruikerVoorUpdate;
                checkOfEmailBestaat();
            });
        },
    // Controleer of er een userId gegeven is.
        checkUserId = function () {
            if (!gegevens._id) {
                callback(maakResponse("Er is geen gebruikerId opgegeven.", {}));
                return;
            }
            getGebruikerVoorUpdate();
        };
    checkUserId();
};
/**
 * Verwijder een gebruiker.
 * @param userId        De userId van de gebruiker die verwijderd moet worden.
 * @param callback      De callback die gebruikt wordt om de data terug te sturen.
 *
 * @callback            JSON-object met een message (en de verwijderde gebruiker).
 */
exports.deleteGebruiker = function (userId, callback) {
    "use strict";
    if (!userId) {
        callback(maakResponse("Er is geen userId opgegeven.", {}));
        return;
    }
    var conditions = {_id: userId},
        fields = {},
        options = {};
    Gebruiker.remove(conditions, fields, options).exec(function (err, data) {
        if (err) {
            callback(maakResponse("Er is iets isgegaan tijdens het verwijderen van de user.", {}));
        } else {
            callback(maakResponse("De user is succesvol verwijderd.", data));
        }
    });
};

var stuurMail = function (ontvanger, wachtwoord, callback) {
// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "info.flexicon@gmail.com",
            pass: "N0g1Keer"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "David Stam <info.flexicon@gmail.com>", // sender address
        to: ontvanger, // list of receivers
        subject: "Wachtwoord gewijzigd", // Subject line
        text: "Uw wachtwoord is gewijzigd", // plaintext body
        html: "<p>Je wachtwoord is gewijzigd:<b>" + wachtwoord + "</b>. We adviseren je het gegeven wachtwoord te wijzigen na inloggen.</p>" // html body
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            callback();
        }else{
            console.log("Message sent: " + response.message);
            callback(response);
        }
    });
}

var genereerNieuwWachtwoord = function () {
    var nieuwWachtwoord = "",
        mogelijkeTekens = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        i;

    for(i = 0; i < 7; i += 1) {
        nieuwWachtwoord += mogelijkeTekens.charAt(Math.floor(Math.random() * mogelijkeTekens.length));
    }

    return nieuwWachtwoord;
};

exports.wachtwoordVergeten = function (gegevens, callback) {
    "use strict";
    if (!gegevens.email) {
        callback(maakResponse("Er is geen email-adres opgegeven.", {}));
        return;
    }
    var gebruiker = {},
        nieuwWachtwoord,
        slaGebruikerOp = function () {
        gebruiker.save(function (err, data) {
            if (err) {
                callback(maakResponse("Er is iets misgegaan tijdens het opslaan van de gegevens.", {}));
                return;
            }
            callback(maakResponse("We hebben je een nieuw wachtwoord gemaild.", {}));
        });
        },
        wijzigWachtwoord = function (wachtwoord) {
        gebruiker.wachtwoord = gebruiker.generateHash(wachtwoord);
        slaGebruikerOp();
        },
        stuurNieuwWachtwoord = function (nieuwWachtwoord) {
        stuurMail(gebruiker.email, nieuwWachtwoord, function (res) {
            if (!res) {
                callback(maakResponse("Het wijzigen van je wachtwoord is mislukt.", {}));
                return;
            }
            callback(maakResponse("We hebben je een nieuw wachtwoord gemaild.", {}));
            wijzigWachtwoord(nieuwWachtwoord);
        });
    },
        zoekGebruiker = function () {
        getUserByEmail(gegevens.email, function (gebruikerVoorUpdate) {
            if (!gebruikerVoorUpdate) {
                callback(maakResponse("Het e-mailadres is onbekend.", {}));
                return;
            }
            nieuwWachtwoord = genereerNieuwWachtwoord();
            gebruiker = gebruikerVoorUpdate;
            stuurNieuwWachtwoord(nieuwWachtwoord);
        });
    }
    zoekGebruiker();
};

exports.addFavoriet = function (gegevens, callback) {
    var gebruiker,
        slaGebruikerOp = function () {
            console.log(gebruiker);
            gebruiker.save(function (err, nieuweGebruiker) {
                if (err) {
                    callback(maakResponse("Er is iets misgegaan tijdens het toevoegen aan favorieten.", {}));
                    return;
                }
                callback(maakResponse("De inzending is toegevoegd aan je favorieten.", nieuweGebruiker));
                console.log(nieuweGebruiker);
            });
        },
        addFavorietToGebruiker = function () {
            gebruiker.favorieten.push(gegevens.inzendingId);
            slaGebruikerOp();
        },
        checkFields = function () {
            if (!gebruiker.checkFavoerietenVelden(gegevens)) {
                callback(maakResponse("Niet alle vereisten velden zijn ingevuld.", {}));
                return;
            }
            addFavorietToGebruiker();
        },
        zoekGebruiker = function () {
            Gebruiker.findOne({_id : gegevens.gebruikerId}, function (err, gevondenGebruiker) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het zoeken naar een gebruiker is mislukt.", {}));
                    return;
                }
                if (!gevondenGebruiker) {
                    callback(maakResponse("Er is geen gebruiker gevonden.", {}));
                    return;
                }
                console.log(gevondenGebruiker);
                gebruiker = gevondenGebruiker;
                checkFields();
            });
        },
        checkOpGebruikerId = function () {
            if (!gegevens.gebruikerId) {
                callback(maakResponse("Er is geen gebruikerId opgegeven", {}));
                return;
            }
            zoekGebruiker();
        };
    checkOpGebruikerId();
};

exports.deleteFavoriet = function (gebruikerId, inzendingId, callback) {
    var gebruiker,
        slaGebruikerOp = function () {
            gebruiker.save(function (err, nieuweGebruiker) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Er is iets misgegaan tijdens opslaan van de gebruiker.", {}));
                    return;
                }
                callback(maakResponse("De inzending is verwijderd uit je favorieten.", nieuweGebruiker));
            });
        },
        spliceArray = function () {
            var i;
            for (i = 0; i < gebruiker.favorieten.length; i += 1) {
                if (gebruiker.favorieten[i] === inzendingId) {
                    gebruiker.favorieten.splice(i,1);
                    spliceArray();
                }
            }
            slaGebruikerOp();
        },
        zoekGebruiker = function () {
            Gebruiker.findOne({_id : gebruikerId}, function (err, gevondenGebruiker) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Er kan geen gebruiker gevonden worden.", {}));
                    return;
                }
                if (!gevondenGebruiker) {
                    callback(maakResponse("Er is geen gebruiker gevonden.", {}));
                    return;
                }
                gebruiker = gevondenGebruiker;
                spliceArray();
            });
        },
        checkFields = function () {
            if (gebruikerId && inzendingId) {
                zoekGebruiker();
            } else {
                callback(maakResponse("De vereiste velden zijn niet gegeven", {}));
            }
        };
    checkFields();
};

exports.getFavorieten = function (gebruikerId, callback) {
    var favorieten = [],
        gebruiker,
        stuurOp = function (nummer) {
            if (nummer >= (favorieten.length - 1)) {
                callback(maakResponse("Het zoeken naar de favorieten is gelukt.", favorieten));
            }
        },
        voegToeAanFavorieten = function (inzending, nummer) {
            favorieten[favorieten.length] = inzending;
            stuurOp(nummer);
        },
        zoekInzending = function (inzendingId, nummer) {
            Inzending.findOne({_id : inzendingId}, function (err, inzending) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!inzending) {
                    return;
                }
                voegToeAanFavorieten(inzending, nummer);
            });
        },
        haalFavorieten = function () {
            var i;
            if (gebruiker.favorieten.length === 0) {
                stuurOp(0);
            } else {
                for (i = 0; i < gebruiker.favorieten.length; i += 1) {
                    zoekInzending(gebruiker.favorieten[i], i);
                }
            }
        },
        zoekGebruiker = function () {
            Gebruiker.findOne({_id : gebruikerId}, function (err, gevondenGebruiker) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Er kan geen gebruiker gevonden worden.", {}));
                    return;
                }
                if (!gevondenGebruiker) {
                    callback(maakResponse("Er is geen gebruiker gevonden.", {}));
                    return;
                }
                gebruiker = gevondenGebruiker;
                haalFavorieten();
            });
        },
        checkGebruikerId = function () {
            if (!gebruikerId) {
                callback(maakResponse("Er is geen gebruikerId opgegeven.", {}));
            }
            zoekGebruiker();
        }
    checkGebruikerId();
};

exports.veranderAvatar = function (gebruikerId, image, callback) {
    var gebruiker,
        slaGebruikerOp = function () {
            gebruiker.save(function (err, updateGebruiker) {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                callback(true);
            });
        },
        veranderAvatarPad = function () {
            gebruiker.avatar = "." + image.path.substr(9);
            console.log(gebruiker.avatar);
            slaGebruikerOp();
        },
        checkBestandExtentie = function () {
            if (image.extension.toLowerCase() === "png" || image.extension.toLowerCase() === "jpg" || image.extension.toLowerCase() === "jpeg") {
                veranderAvatarPad();
            } else {
                callback(false);
            }
        },
        checkBestandsGrootte = function () {
            if (image.size > 100000) {
                callback(false);
                return;
            }
            checkBestandExtentie();
        },
        zoekGebruiker = function () {
            Gebruiker.findOne({_id : gebruikerId}, function (err, gevondenGebruiker) {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (!gevondenGebruiker) {
                    callback(false);
                    return;
                }
                gebruiker = gevondenGebruiker;
                checkBestandsGrootte();
            });
        },
        checkGebruikerId = function () {
            if (!gebruikerId) {
                callback(false);
                return;
            }
            if (!image) {
                callback(false);
                return;
            }
            zoekGebruiker();
        };
    checkGebruikerId();
};