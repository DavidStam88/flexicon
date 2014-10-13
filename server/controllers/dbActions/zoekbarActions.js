/**
 * Created by david on 17-06-14.
 */

var Inzending = require('../../databaseModels/inzending.js'),
    Flexicon = require('../../databaseModels/flexicon.js');

var maakResponse = function (message, data) {
    return {
        "message" : message,
        "data" : data
    };
};

exports.zoekWoorden = function (invoer, callback) {
    var alleSuggesties = [];
    var suggestiesGefilterd = [];
    var zoekWoorden = [];
    var huidigeInzending;

    var checkOfWoordAlInSuggestiesGefilterd = function (inzending) {
        var i;
        for (i = 0; i < suggestiesGefilterd; i += 1) {
            if (suggestiesGefilterd[i]._id === inzending._id) {
                return;
            }
        }
        suggestiesGefilterd.push(inzending);
    }

    var checkOfAlInSuggestiesGefilterd = function () {
        var i;
        for (i = 0; i < suggestiesGefilterd; i += 1) {
            if (suggestiesGefilterd[i]._id === huidigeInzending._id) {
                return;
            }
        }
        suggestiesGefilterd.push(huidigeInzending);
    }

    var filterOpDefinitie = function () {
        var i,
            checkOfInDefinitie = function (zoekWoord) {
                var i;
                for (i = 0; i < alleSuggesties.length; i += 1) {
                    if (alleSuggesties[i].definitie.toLowerCase().indexOf(zoekWoord) > -1) {
                        checkOfWoordAlInSuggestiesGefilterd(alleSuggesties[i]);
                    }
                }
            }
        for (i = 0; i < zoekWoorden.length; i += 1) {
            checkOfInDefinitie(zoekWoorden[i]);
        }
        callback(maakResponse("Het zoeken is gelukt.", suggestiesGefilterd));
    }

    var vergelijkAlleLetters = function (tag, zoekWoord) {
        var i;
        for (i = 0; i < zoekWoord.length; i += 1) {
            if (zoekWoord[i].toLowerCase() !== tag[i].toLowerCase()) {
                return;
            }
        }
        checkOfAlInSuggestiesGefilterd();
    }

    var vergelijkTagMetZoekWoord = function (zoekWoord, tag) {
        var i;
        if (zoekWoord <= tag) {
            for (i = 0; i < tag.length; i += 1) {
                if (tag[i].toLowerCase() === zoekWoord[0].toLowerCase()) {
                    if (tag.substring(i-1).length >= zoekWoord.length) {
                        tag.substring(i-1);
                        vergelijkAlleLetters(tag, zoekWoord);
                    }
                }
            }
        } else {
            for (i = 0; i < zoekWoord.length; i += 1) {

            }
        }
    }

    var vergelijkTag = function (tag) {
        var i;
        for (i = 0; i < zoekWoorden.length; i += 1) {
            vergelijkTagMetZoekWoord(zoekWoorden[i], tag);
        }
    }

    var checkOfInTags = function (tags) {
        var i;
        for (i = 0; i < tags.length; i += 1) {
            tags[i] = tags[i].toLowerCase();
            vergelijkTag(tags[i]);
        }
    }

    var filterOpTags = function () {
        var i;
        for (i = 0; i < alleSuggesties.length; i += 1) {
            huidigeInzending = alleSuggesties[i];
            checkOfInTags(alleSuggesties[i].tags);
        }
        //console.log(suggestiesGefilterd);
        filterOpDefinitie();
    }

    var getFlexicons = function () {
        var i;
        Flexicon.find(function (err, data) {
            if (err) {
                console.log(err);
                callback(maakResponse("Het zoeken naar woorden is mislukt.", {}));
                return;
            }
            for (i = 0; i < data.length; i += 1) {
                alleSuggesties.push(data[i]);
            }
            filterOpTags();
        });
    }

    var getInzendingen = function () {
        Inzending.find(function (err, data) {
            if (err) {
                console.log(err);
                callback(maakResponse("Het zoeken naar woorden is mislukt.", {}));
                return;
            }
            alleSuggesties = data;
            getFlexicons();
        });
    }
    var filterZoekWoorden = function () {
        var i;
        invoer += " ";
        invoer = invoer.toLowerCase();
        var woord = "";
        for (i = 0; i < invoer.length; i += 1) {
            if (invoer[i] !== " ") {
                woord += invoer[i];
            } else {
                zoekWoorden[zoekWoorden.length] = woord;
                woord = "";
            }
        }
        getInzendingen();
    }
    filterZoekWoorden();
};