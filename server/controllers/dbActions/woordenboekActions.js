/* Created by Wessel on 26/05/14 */

var Woordenboek = require('../../databaseModels/woordenboek.js');
    
    /**
      Het object wat telkens wordt terug gestuurd nadat deze word ingevuld
    */
var maakResponse = function (message, data) {
    return {
        "datumRequest" : new Date(),
        "message" : message,
        "data" : data
    }
}

/**
    Hier wordt een enkel woord gezocht in het woordenboek
    @woordId : het id van het te vinden woord
*/
exports.getWoord = function (woordId, callback) {
    Woordenboek.findOne({_id : woordId}, function (err, woord) {
        if (err) {
            console.log(err);
            callback(maakResponse("Het zoeken naar het woord is mislukt", {}));
            return;
        }
        callback(maakResponse("Het zoeken naar het woord is gelukt", woord));
    });
};

/**
    Hier worden alle originele woorden in het woordenboek opgezocht
*/
exports.getWoordenboek = function (callback) {
    'use strict';
    Woordenboek.find(function (err, book) {
        if (err) {
            callback(
                maakResponse("Er is iets misgegaan tijdens het zoeken naar de woorden.", {})
            );
        } else {
            callback(
                maakResponse("Het zoeken naar woorden is gelukt.", book)
            );
        }
    });
};

/**
    Hier worden de woorden die beginnen met een bepaalde letter opgezocht in het woordenboek
    @letter : de letter waarme de woorden moeten beginnen
*/
exports.getWoordenByLetter = function (letter, callback) {
    'use strict';
    var woorden = [],
        alleWoorden = [],
        filterWoorden = function () {
            var i;
            for (var i = 0; i < alleWoorden.length; i += 1) {
                if (alleWoorden[i].woord[0].toString().toLowerCase() === letter.toString().toLowerCase()) {
                    woorden[woorden.length] = alleWoorden[i];
                }
            }
            callback(maakResponse("Het zoeken naar de flexicons is gelukt.", woorden));
        },
        zoekAlleWoorden = function () {
            Woordenboek.find(function (err, data) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
                    return;
                }
                alleWoorden = data;
                filterWoorden();
            })
        };
    zoekAlleWoorden();
};

/**
    Hier wordt het huidige woord van de week opgezocht
*/
exports.getWoordVanDeWeek = function (callback) {
    'use strict';
    var vandaag = new Date(),
        woorden = [],
        selecteerWoord = function () {
            var i;
            for (i = 0; i < woorden.length; i += 1) {
                if (vandaag >= woorden[i].startDatum && vandaag <= woorden[i].eindDatum) {
                    callback(maakResponse("Het woord is gevonden.", woorden[i]));
                    return;
                }
            }
            callback(maakResponse("Het woord Kan niet worden gevonden.", {}));
        },
        zoekAlleWoorden = function () {
            Woordenboek.find(function (err, book) {
                if (err) {
                    callback(
                        maakResponse("Er is iets misgegaan tijdens het zoeken naar de woorden.", {})
                    );
                    return;
                }
                woorden = book;
                selecteerWoord();
            });
        };
    zoekAlleWoorden();
};