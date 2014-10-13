/* Created by Wessel on 26/05/14 */

var flexiconActions = require('./dbActions/flexiconActions.js');

exports.getFlexicon = function (req, res) {
    flexiconActions.getFlexicon(function (message) {
        res.send(message);
    });
};

exports.getFlexiconByThema = function (req, res) {
    flexiconActions.getFlexiconByThema(req.params.id, function (message) {
        res.send(message);
    });
};

exports.getFlexiconByWoord = function (req, res) {
    flexiconActions.getFlexiconByWoord(req.params.id, function (message) {
        res.send(message);
    });
};

exports.getFlexiconByTag = function (req, res) {
    flexiconActions.getFlexiconByTag(req.params.id, function (message) {
        res.send(message);
    });
};

exports.getOneFlexicon = function (req, res) {
    flexiconActions.getOneFlexicon(req.params.id, function (message) {
        res.send(message);
    });
};