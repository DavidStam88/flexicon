/* Created by Wessel on 26/05/14 */

var woordenboekActions = require('./dbActions/woordenboekActions.js');

exports.getWoordenboek = function (req, res) {
    woordenboekActions.getWoordenboek(function (message) {
        res.send(message);
    });
};

exports.getWoordVanDeWeek = function (req, res) {
    woordenboekActions.getWoordVanDeWeek(function (woord) {
        res.send(woord);
    });
};

exports.getWoord = function (req, res) {
    woordenboekActions.getWoord(req.params.id, function (woord) {
        res.send(woord);
    });
};

exports.getWoordenByLetter = function (req, res) {
    woordenboekActions.getWoordenByLetter(req.params.id, function (resp) {
        res.send(resp);
    });
};