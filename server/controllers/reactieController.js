var reactieActions = require('./dbActions/reactieActions.js');

exports.getReactiesByInzending = function (req, res) {
    'use strict';

    reactieActions.getReactiesByInzending(req.params.id, function (message) {
        res.send(message);
    });
};

exports.getReactiesByGebruiker = function (req, res) {
    'use strict';

    reactieActions.getReactiesByGebruiker(req.params.id, function (message) {
        res.send(message);
    });
};

exports.createReactie = function (req, res) {
    'use strict';

    reactieActions.createReactie(req.body, function (message) {
        res.send(message);
    });
};

exports.deleteReactie = function (req, res) {
    'use strict';

    reactieActions.deleteReactie(req.params.id, function (message) {
        res.send(message);
    });
};