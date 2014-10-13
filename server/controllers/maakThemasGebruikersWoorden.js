/**
 * Created by david on 31-05-14.
 */

var Thema = require('../databaseModels/thema.js'),
    Gebruiker = require('../databaseModels/gebruiker.js'),
    Afbeelding = require('../databaseModels/afbeelding.js'),
    Lettertype = require('../databaseModels/lettertype.js'),
    Woord = require('../databaseModels/woordenboek.js'),
    themas = [],

    drieOpReis = {
        "naam" : "Drie op reis",
        "themaAfbeelding" : "./images/themas/3opReis/3opReis.jpg",
        "afbeeldingen" : [["3OR-01", "./images/themas/3opReis/afbeeldingen/3OR-01.jpg", "./images/themas/3opReis/thumbnails/3OR-01.jpg"], ["3OR-02", "./images/themas/3opReis/afbeeldingen/3OR-02.jpg", "./images/themas/3opReis/thumbnails/3OR-02.jpg"], ["3OR-03", "./images/themas/3opReis/afbeeldingen/3OR-03.jpg", "./images/themas/3opReis/thumbnails/3OR-03.jpg"], ["3OR-04", "./images/themas/3opReis/afbeeldingen/3OR-04.jpg", "./images/themas/3opReis/thumbnails/3OR-04.jpg"], ["3OR-05", "./images/themas/3opReis/afbeeldingen/3OR-05.jpg", "./images/themas/3opReis/thumbnails/3OR-05.jpg"]],
        "lettertypes" : ["introregular", "reckonerboldcondensedbold", "woodshopregular"]
    },
    algemeen = {
        "naam" : "Algemeen",
        "themaAfbeelding" : "./images/themas/Algemeen/algemeen.jpg",
        "afbeeldingen" : [["A-01", "./images/themas/Algemeen/afbeeldingen/A-01.jpg", "./images/themas/Algemeen/thumbnails/A-01.jpg"], ["A-02", "./images/themas/Algemeen/afbeeldingen/A-02.jpg", "./images/themas/Algemeen/thumbnails/A-02.jpg"], ["A-03", "./images/themas/Algemeen/afbeeldingen/A-03.jpg", "./images/themas/Algemeen/thumbnails/A-03.jpg"], ["A-04", "./images/themas/Algemeen/afbeeldingen/A-04.jpg", "./images/themas/Algemeen/thumbnails/A-04.jpg"], ["A-05", "./images/themas/Algemeen/afbeeldingen/A-05.jpg", "./images/themas/Algemeen/thumbnails/A-05.jpg"]],
        "lettertypes" : ["chunkfiveregular", "cocogooseregular", "colunacondensedbold"]
    },
    jeZalHetMaarHebben = {
        "naam" : "Je zal het maar hebben",
        "themaAfbeelding" : "./images/themas/JeZalHetMaarHebben/jeZalHetMaarHebben.jpg",
        "afbeeldingen" : [["JZHMH-01", "./images/themas/JeZalHetMaarHebben/afbeeldingen/JZHMH-01.jpg", "./images/themas/JeZalHetMaarHebben/thumbnails/JZHMH-01.jpg"], ["JZHMH-02", "./images/themas/JeZalHetMaarHebben/afbeeldingen/JZHMH-02.jpg", "./images/themas/JeZalHetMaarHebben/thumbnails/JZHMH-02.jpg"], ["JZHMH-03", "./images/themas/JeZalHetMaarHebben/afbeeldingen/JZHMH-03.jpg", "./images/themas/JeZalHetMaarHebben/thumbnails/JZHMH-03.jpg"], ["JZHMH-04", "./images/themas/JeZalHetMaarHebben/afbeeldingen/JZHMH-04.jpg", "./images/themas/JeZalHetMaarHebben/thumbnails/JZHMH-04.jpg"], ["JZHMH-05", "./images/themas/JeZalHetMaarHebben/afbeeldingen/JZHMH-05.jpg", "./images/themas/JeZalHetMaarHebben/thumbnails/JZHMH-05.jpg"]],
        "lettertypes" : ["albaregular", "confidelregular", "meritregular"]
    },
    socialClub = {
        "naam" : "Social Club",
        "themaAfbeelding" : "./images/themas/SocialClub/socialClub.jpg",
        "afbeeldingen" : [["SC-01", "./images/themas/SocialClub/afbeeldingen/SC-01.jpg", "./images/themas/SocialClub/thumbnails/SC-01.jpg"], ["SC-02", "./images/themas/SocialClub/afbeeldingen/SC-02.jpg", "./images/themas/SocialClub/thumbnails/SC-02.jpg"], ["SC-03", "./images/themas/SocialClub/afbeeldingen/SC-03.jpg", "./images/themas/SocialClub/thumbnails/SC-03.jpg"], ["SC-04", "./images/themas/SocialClub/afbeeldingen/SC-04.jpg", "./images/themas/SocialClub/thumbnails/SC-04.jpg"], ["SC-05", "./images/themas/SocialClub/afbeeldingen/SC-05.jpg", "./images/themas/SocialClub/thumbnails/SC-05.jpg"]],
        "lettertypes" : ["chunkfiveregular", "hallosansblack", "kilogramregular"]
    },
    spuitenEnSlikken = {
        "naam" : "Spuiten en Slikken",
        "themaAfbeelding" : "./images/themas/SpuitenEnSlikken/spuitenEnSlikken.jpg",
        "afbeeldingen" : [["SPSL-01", "./images/themas/SpuitenEnSlikken/afbeeldingen/SPSL-01.jpg", "./images/themas/SpuitenEnSlikken/thumbnails/SPSL-01.jpg"], ["SPSL-02", "./images/themas/SpuitenEnSlikken/afbeeldingen/SPSL-02.jpg", "./images/themas/SpuitenEnSlikken/thumbnails/SPSL-02.jpg"], ["SPSL-03", "./images/themas/SpuitenEnSlikken/afbeeldingen/SPSL-03.jpg", "./images/themas/SpuitenEnSlikken/thumbnails/SPSL-03.jpg"], ["SPSL-04", "./images/themas/SpuitenEnSlikken/afbeeldingen/SPSL-04.jpg", "./images/themas/SpuitenEnSlikken/thumbnails/SPSL-04.jpg"], ["SPSL-05", "./images/themas/SpuitenEnSlikken/afbeeldingen/SPSL-05.jpg", "./images/themas/SpuitenEnSlikken/thumbnails/SPSL-05.jpg"]],
        "lettertypes" : ["bebasneueregular", "caviardreamsbold", "fightnightregular"]
    },
    urban = {
        "naam" : "Urban",
        "themaAfbeelding" : "./images/themas/Urban/urban.jpg",
        "afbeeldingen" : [["UR-01", "./images/themas/Urban/afbeeldingen/UR-01.jpg", "./images/themas/Urban/thumbnails/UR-01.jpg"], ["UR-02", "./images/themas/Urban/afbeeldingen/UR-02.jpg", "./images/themas/Urban/thumbnails/UR-02.jpg"], ["UR-03", "./images/themas/Urban/afbeeldingen/UR-03.jpg", "./images/themas/Urban/thumbnails/UR-03.jpg"], ["UR-04", "./images/themas/Urban/afbeeldingen/UR-04.jpg", "./images/themas/Urban/thumbnails/UR-04.jpg"], ["UR-05", "./images/themas/Urban/afbeeldingen/UR-05.jpg", "./images/themas/Urban/thumbnails/UR-05.jpg"]],
        "lettertypes" : ["bobregular", "scruffyregular", "urbanslickregular"]
    },

    themas = [drieOpReis, algemeen, jeZalHetMaarHebben, socialClub, spuitenEnSlikken, urban],
    gebruikers = [["dt.stam@gmail.com", "David", "admin"], ["w.vantunen@gmail.com", "Wessel", "admin"], ["v.dendoop@gmail.com", "Vincent", "admin"], ["b.vanos@gmail.com", "Bas", "admin"], ["j.koster@gmail.com", "Jeroen", "admin"]],

    slaOp = function (onderdeel, callback) {
        onderdeel.save(function(err, data) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(data);
            }
        });
    },
    maakThema = function (naam, themaAfbeelding, afbeeldingen, lettertypes) {
        var thema = new Thema(),
            i,
            x;
        thema.naam = naam;
        thema.themaAfbeelding = themaAfbeelding;
        thema.datum = Date.now();
        slaOp(thema, function (res) {
            if (res) {
                for (i = 0; i < afbeeldingen.length; i += 1) {
                    maakAfbeelding(res._id, afbeeldingen[i][0], afbeeldingen[i][1], afbeeldingen[i][2]);
                }
                for (x = 0; x < lettertypes.length; x += 1) {
                    maakLettertype(res._id, lettertypes[x]);
                }
            }
        });
    },
    maakAfbeelding = function (themaId, naam, path, thumbnail) {
        var afbeelding = new Afbeelding();
        afbeelding.naam = naam;
        afbeelding.themaId = themaId;
        afbeelding.thumbnail = thumbnail;
        afbeelding.path = path;
        afbeelding.datum = Date.now();
        slaOp(afbeelding, function (res) {

        });
    },
    maakLettertype = function (themaId, naam) {
        var lettertype = new Lettertype();
        lettertype.naam = naam;
        lettertype.themaId = themaId;
        lettertype.datum = Date.now();
        slaOp(lettertype, function (res) {

        });
    },
    maakGebruiker = function (email, gebruikersnaam, wachtwoord) {
        var gebruiker = new Gebruiker();
        gebruiker.email = email;
        gebruiker.gebruikersnaam = gebruikersnaam;
        gebruiker.wachtwoord = gebruiker.generateHash(wachtwoord);
        gebruiker.favorieten = [];
        gebruiker.datum = Date.now();
        slaOp(gebruiker, function(res) {

        });
    },
    maakAlles = function () {
        var i;
        for (i = 0; i < themas.length; i += 1) {
            maakThema(themas[i].naam, themas[i].themaAfbeelding, themas[i].afbeeldingen, themas[i].lettertypes);
        }
    },
    maakGebruikers = function () {
        var i;
        for (i = 0; i < gebruikers.length; i += 1) {
            maakGebruiker(gebruikers[i][0], gebruikers[i][1], gebruikers[i][2]);
        }
    };

exports.maakTestData = function (req, res) {
    maakAlles();
    maakGebruikers();
    res.send("Ok man.");
};

exports.maakWoorden = function (req, res) {
    var afbeeldingIds = [],
        maakWoord = function (betekenis, startDatum, eindDatum, tags, afbeeldingId) {
        var woord = new Woord();
        woord.woord = betekenis;
        woord.startDatum = startDatum;
        woord.eindDatum = eindDatum;
        woord.afbeeldingId = afbeeldingId;
        woord.tags = tags;
        woord.datum = Date.now();
        slaOp(woord, function (res) {

        });
        },
        geefRandomId = function (array) {
            var random = Math.round(Math.random() * (array.length - 1)),
                id = array[random];

            return id;
        },
    maakWoorden = function () {
        maakWoord("Multicultureel", new Date(2014,2,1), new Date(2014,2,7), ["cultuur", "buitenland", "metling pot", "multicultureel"], geefRandomId(afbeeldingIds));
        maakWoord("Aftuigen", new Date(2014,2,7), new Date(2014,2,14), ["an", "geweld", "crimineel", "aftuigen"], geefRandomId(afbeeldingIds));
        maakWoord("Metro", new Date(2014,2,14), new Date(2014,2,21), ["vervoer", "ov", "metro"], geefRandomId(afbeeldingIds));
        maakWoord("Gokken", new Date(2014,2,21), new Date(2014,2,28), ["casino", "wedden", "gokken"], geefRandomId(afbeeldingIds));
        maakWoord("God", new Date(2014,2,28), new Date(2014,3,4), ["geloof", "kerk", "god"], geefRandomId(afbeeldingIds));
        maakWoord("Pistool", new Date(2014,3,4), new Date(2014,3,11), ["wapens", "crimineel", "pistool"], geefRandomId(afbeeldingIds));
        maakWoord("Blowen", new Date(2014,3,11), new Date(2014,3,18), ["drugs", "high", "blowen"], geefRandomId(afbeeldingIds));
        maakWoord("Sex", new Date(2014,3,18), new Date(2014,3,25), ["sex", "vrijen", "intiem"], geefRandomId(afbeeldingIds));
        maakWoord("Reizen", new Date(2014,3,25), new Date(2014,4,2), ["vervoer", "vakantie", "reizen"], geefRandomId(afbeeldingIds));
        maakWoord("Prostitutie", new Date(2014,4,2), new Date(2014,4,9), ["hoer", "loverboy", "prostituee"], geefRandomId(afbeeldingIds));
        maakWoord("Buik", new Date(2014,4,9), new Date(2014,4,16), ["Dik", "Navel", "Bier"], geefRandomId(afbeeldingIds));
        maakWoord("Vriend", new Date(2014,4,16), new Date(2014,4,23), ["broeder", "maatje", "vriend"], geefRandomId(afbeeldingIds));
        maakWoord("Mama", new Date(2014,4,23), new Date(2014,4,30), ["Moeder", "Vrouw", "Ouders"], geefRandomId(afbeeldingIds));
        maakWoord("Help", new Date(2014,4,30), new Date(2014,5,6), ["noodgeval", "ongeluk", "help"], geefRandomId(afbeeldingIds));
        maakWoord("Stoer", new Date(2014,5,6), new Date(2014,5,13), ["vet", "hard", "stoer"], geefRandomId(afbeeldingIds));
        maakWoord("Voetbal", new Date(2014,5,13), new Date(2014,5,20), ["Bal", "WK", "Vitesse"], geefRandomId(afbeeldingIds));
        maakWoord("Melk", new Date(2014,5,20), new Date(2014,5,27), ["Koe", "Nederland", "Drinken"], geefRandomId(afbeeldingIds));
        maakWoord("Hard gaan", new Date(2014,5,27), new Date(2014,6,3), ["high", "hard gaan", "spacen"], geefRandomId(afbeeldingIds));
        maakWoord("Moeilijk doen", new Date(2014,6,3), new Date(2014,6,10), ["vervelend", "lastig", "moeilijk doen"], geefRandomId(afbeeldingIds));
        maakWoord("Groetjes", new Date(2014,6,10), new Date(2014,6,17), ["doei", "groeten", "groetjes"], geefRandomId(afbeeldingIds));
        maakWoord("Hallo", new Date(2014,6,17), new Date(2014,6,23), ["hoi", "groeten", "hallo"], geefRandomId(afbeeldingIds));
        maakWoord("Groot", new Date(2014,6,23), new Date(2014,6,30), ["Lang", "Flink", "Nederland"], geefRandomId(afbeeldingIds));
        maakWoord("Mooi", new Date(2014,6,30), new Date(2014,7,6), ["prachtig", "interessant", "mooi"], geefRandomId(afbeeldingIds));
        maakWoord("Sexy", new Date(2014,7,6), new Date(2014,7,13), ["geil", "mooi", "sexy"], geefRandomId(afbeeldingIds));
        maakWoord("Crimineel", new Date(2014,7,13), new Date(2014,7,20), ["gangster", "illegaal", "crimineel"], geefRandomId(afbeeldingIds));
        maakWoord("Muziek", new Date(2014,7,20), new Date(2014,7,27), ["cd", "geluid", "muziek"], geefRandomId(afbeeldingIds));
        maakWoord("Doei", new Date(2014,7,27), new Date(2014,8,3), ["dag", "groeten", "doei"], geefRandomId(afbeeldingIds));
        maakWoord("Lui", new Date(2014,8,3), new Date(2014,8,10), ["niet veel doen", "vervelen", "lui"], geefRandomId(afbeeldingIds));
        maakWoord("Drank", new Date(2014,8,10), new Date(2014,8,17), ["alcohol", "drugs", "drank"], geefRandomId(afbeeldingIds));
        maakWoord("Snuiven", new Date(2014,8,17), new Date(2014,8,24), ["cocaïne", "drugs", "snuiven"], geefRandomId(afbeeldingIds));
    },
        getafbeeldingIds = function (afbeeldingen) {
            var i;
            for (i = 0; i < afbeeldingen.length; i += 1) {
                afbeeldingIds[afbeeldingIds.length] = afbeeldingen[i]._id;
            }
            maakWoorden();
        },
        getAfbeeldingen = function () {
            Afbeelding.find(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    getafbeeldingIds(data);
                }
            })
        };
    getAfbeeldingen();
    res.send("Gelukt");
};