/* Created by Wessel on 21/05/14 */

var inzendingActions = require('./dbActions/inzendingActions.js');

exports.getInzendingenWoord = function (req, res) {
    'use strict';

    inzendingActions.getInzendingenWoord(req.params.id, function (message) {
        res.send(message);
    });
};

exports.getInzendingenGebruiker = function (req, res) {
    'use strict';

    inzendingActions.getInzendingenGebruiker(req.params.id, function (message) {
        res.send(message);
    });
};

exports.createInzending = function (req, res) {
    inzendingActions.createInzending(req.body, function (resp) {
        res.send(resp)
    });
};

exports.getInzendingenTag = function (req, res) {
    inzendingActions.getInzendingenTag(req.params.id, function (resp) {
        res.send(resp);
    });
};

exports.deleteInzending = function (req, res) {
    inzendingActions.deleteInzending(req.params.id, function (resp) {
        res.send(resp);
    });
};

exports.geefFlexpoint = function (req, res) {
    var currentDate = new Date(),
        restOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);

    var geefFlex = function () {
        inzendingActions.geefFlexpoint(req.body, function (data) {
            res.send(data);
        });
    }

    var checkOfInCookie = function (array) {
        var i;
        for (i = 0; i < array.length - 1; i += 1) {
            if (req.body.inzendingId === array[i]) {
                res.send({
                    "datumRequest" : Date.now,
                    "message" : "Je hebt vandaag al op deze inzending gestemd.",
                    "data" : {}
                });
                return;
            }
        }
        geefFlex();
    }

    if (req.cookies.flexpoints) {
        console.log(req.cookies.flexpoints);
        console.log(req.cookies.flexpoints.length);
        var nieuw = [],
            i;
        for (i = 0; i < req.cookies.flexpoints.length; i += 1) {
            nieuw[i] = req.cookies.flexpoints[i];
        }
        nieuw.push(req.body.inzendingId);
        res.cookie('flexpoints', nieuw, { expires: restOfDay });
        checkOfInCookie(nieuw);
    } else {
        res.cookie('flexpoints', [req.body.inzendingId], { expires: restOfDay });
        geefFlex();
    }
};

exports.getInzending = function (req, res) {
    inzendingActions.getInzending(req.params.id, function (resp) {
        res.send(resp);
    });
}

exports.addVideo = function (req, res) {
    console.log(req.files);
    res.send("Hoi");
    //inzendingActions.addVideo(req.body, function (resp) {
        //res.send(resp);
    //});
}