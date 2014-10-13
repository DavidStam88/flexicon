/**
 * Created by david on 31-05-14.
 */

var lettertypeActions = require('./dbActions/lettertypeActions.js');

exports.getLettertypes = function (req, res) {
    lettertypeActions.getLettertypes(req.params.id, function (lettertypes) {
        res.send(lettertypes);
    });
};

exports.getLettertype = function (req, res) {
    lettertypeActions.getLettertype(req.params.id, function (lettertype) {
        res.send(lettertype);
    });
};