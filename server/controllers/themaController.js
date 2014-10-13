var themaActions = require('./dbActions/themaActions.js');

exports.getThemas = function (req, res) {
    'use strict';
    console.log("Zoeken naar themas.");
    themaActions.getThemas(function (message) {
        res.send(message);
    });
};

exports.getThema = function (req, res) {
    'use strict';
    themaActions.getThema(req.params.id, function (message) {
        res.send(message);
    });
};