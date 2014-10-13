var Reactie = require('../../databaseModels/reactie.js'),
    /**
      Het object wat telkens wordt terug gestuurd nadat deze word ingevuld
    */
    maakResponse = function (message, data) {
        return {
            "datumRequest" : Date.now,
            "message" : message,
            "data" : data
        };
    };

/**
    Hier worden alle reactie die bij een bepaalde inzending horen opgezocht
    @inzendingId : het id van de inzending waar in gezocht moet worden
*/
exports.getReactiesByInzending = function (inzendingId, callback) {
    'use strict';
    Reactie.find({inzendingId : inzendingId}, function (err, reacties) {
        if (err) {
            console.log(err);
            return;
        }
        callback(maakResponse("Het ophalen van de reacties is gelukt.", reacties));
    });
};

/**
    Hier worden alle reactie van een bepaalde gebruiker opgezocht
    @gebruikerId : de te zoeken gebruiker
*/
exports.getReactiesByGebruiker = function (gebruikerId, callback) {
    'use strict';
    Reactie.find({gebruikerId : gebruikerId}, function (err, reacties) {
        if (err) {
            console.log(err);
            return;
        }
        callback(maakResponse("Het ophalen van de reacties is gelukt.", reacties));
    });
};

/**
    Hier wordt een reactie aangemaakt
    @gegevens : de ingevulde gegevens uit het ingezonden formulier
*/
exports.createReactie = function (gegevens, callback) {
    'use strict';
    var reactie = new Reactie(),
        slaReactieOp = function () {
            reactie.save(function (err, reactie) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("Het opslaan van de reactie is mislukt.", {}));
                    return;
                }
                callback(maakResponse("Je reactie is geplaatst.", reactie));
            });
        },
        maakReactie = function () {
            reactie.gebruikerId = gegevens.gebruikerId;
            reactie.inzendingId = gegevens.inzendingId;
            reactie.boodschap = gegevens.boodschap;
            slaReactieOp();
        },
        validateBoodschap = function () {
            if (!reactie.validateBoodschap(gegevens.boodschap)) {
                callback(maakResponse("Je reactie is te kort.", {}));
                return;
            }
            maakReactie();
        },
        checkFields = function () {
            if (!reactie.checkFields(gegevens)) {
                callback(maakResponse("Niet alle vereiste velden zijn ingevuld.", {}));
                return;
            }
            validateBoodschap();
        };
    checkFields();
};

/**
    Hier wordt een enkele reactie verwijderd
    @reactieId : de te verwijderen reactie
*/
exports.deleteReactie = function (reactieId, callback) {
    'use strict';
    Reactie.remove({_id : reactieId}).exec(function (err, reactie) {
        if (err) {
            callback(maakResponse("Het verwijderen van de reactie is mislukt.", {}));
            return;
        }
        callback(maakResponse("Je reactie is verwijderd.", reactie));
    });
};