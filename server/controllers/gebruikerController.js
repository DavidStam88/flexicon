/**
 * Created by david on 19-05-14.
 */

var gebruikerActions = require('./dbActions/gebruikerActions.js');

exports.getGebruikers = function (req, res) {
    'use strict';
    gebruikerActions.getGebruikers(function (gebruikers) {
        res.send(gebruikers);
    });
};

exports.getGebruiker = function (req, res) {
    'use strict';
    gebruikerActions.getGebruiker(req.params.id, function (gebruiker) {
        res.send(gebruiker);
    });
};

exports.createGebruiker = function (req, res) {
    'use strict';
    gebruikerActions.createGebruiker(req.body, function (gebruiker) {
        res.send(gebruiker);
    });
};

exports.updateGebruiker = function (req, res) {
    'use strict';
    gebruikerActions.updateGebruiker(req.body, function (gebruiker) {
        res.send(gebruiker);
    });
};

exports.deleteGebruiker = function (req, res) {
    'use strict';
    gebruikerActions.deleteGebruiker(req.params.id, function (verwijderd) {
        res.send(verwijderd);
    });
}

exports.wachtwoordVergeten = function (req, res) {
    'use strict';
    gebruikerActions.wachtwoordVergeten(req.body, function (nieuwWachtwoord) {
        res.send(nieuwWachtwoord);
    });
}

exports.login = function (req, res) {
    "use strict";
    res.send({
        "gebruikersNaam" : req.user.email,
        "gebruikerId" : req.user.id,
        "ingelogd" : true,
        "message" : "U bent ingelogd"
    });
};

exports.logout = function (req, res) {
    "use strict";
    req.logout();
    res.send({
        "message" : "U bent uitgelogd..",
        "ingelogd" : false
    });
};

exports.checkLogin = function (req, res, next) {
    "use strict";
    if (req.isAuthenticated()) {
        return next();
    }
    res.send({
        "ingelogd" : false,
        "message" : "De ingevulde gegevens zijn onjuist"
    });
};

exports.addFavoriet = function (req, res) {
    gebruikerActions.addFavoriet(req.body, function (resp) {
        res.send(resp);
    });
};

exports.deleteFavoriet = function (req, res) {
    gebruikerActions.deleteFavoriet(req.params.gebruikerId, req.params.inzendingId, function (resp) {
        res.send(resp);
    });
};

exports.getFavorieten = function (req, res) {
    gebruikerActions.getFavorieten(req.params.id, function (resp) {
        res.send(resp);
    });
};

exports.veranderAvatar = function(req, res) {
    console.log(req.files.image);
    gebruikerActions.veranderAvatar(req.body.gebruikerId, req.files.image, function (resp) {
        if (resp) {
            res.redirect("/#/account/" + req.body.gebruikerId);
        } else {
            res.redirect("/#/account/mislukt/" + req.body.gebruikerId);
        }
    });
};