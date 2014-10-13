/**
 * Created by david on 31-05-14.
 */

var afbeeldingActions = require('./dbActions/afbeeldingActions.js');

exports.getAfbeeldingenThema = function (req, res) {
    afbeeldingActions.getAfbeeldingenThema(req.params.id, function (afbeeldingen) {
        res.send(afbeeldingen);
    });
};

exports.getAfbeelding = function (req, res) {
    afbeeldingActions.getAfbeelding(req.params.id, function (afbeelding) {
        res.send(afbeelding);
    });
};