var Thema = require('../../databaseModels/thema.js');

/**
    Hier worden alle themas opgezocht
*/
exports.getThemas = function (callback) {
    'use strict';
    console.log("Zoeken naar thema");

    Thema.find(function (err, data) {
        if (err) {
            callback ({
                "error": true,
                "message": "Thema's ophalen is mislukt",
                "data": err
            });
        } else {
            callback ({
                "error": false,
                "message": "Thema's ophalen is gelukt",
                "data": data
            });
        }
    });
};

/**
    Hier wordt een enkel thema gezocht
    @themaId : het id van het te vinden thema
*/
exports.getThema = function (themaId, callback) {
    'use strict';
    console.log("Zoeken naar thema");

    var conditions = { _id: themaId },
        fields = {},
        options = {};

    Thema.findOne(conditions, fields, options, function (err, thema) {
        if (err) {
            callback({
                "error": true,
                "message": "Thema: " + themaId + " ophalen is mislukt",
                "data": err
            });
        } else {
            console.log("Thema gevonden");
            callback({
                "error": false,
                "message": "Thema ophalen is gelukt",
                "data": thema
            });
        }
    });
};