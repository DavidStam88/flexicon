/**
 * Created by david on 17-06-14.
 */

var zoekbarActions = require('./dbActions/zoekbarActions.js');

exports.getWoorden = function (req, res) {
    zoekbarActions.zoekWoorden(req.params.id, function (resp) {
        res.send(resp);
    });
};