/* Created by Wessel on 26/05/14 */

var Flexicon = require('../../databaseModels/flexicon.js'),
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
    Hier wordt het totale flexicon gezocht
*/
exports.getFlexicon = function (callback) {
    'use strict';
    Flexicon.find(function (err, book) {
        if (err) {
            console.log(err);
            callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
            return;
        }
        callback(maakResponse("het zoeken naar de Flexicon-inzendingen is gelukt.", book));
    });
};

/**
    Hier worden alle inzendingen per specifiek thema in het flexicon gezocht
    @themaId : het id van het gezochte thema
*/
exports.getFlexiconByThema = function (themaId, callback) {
    'use strict';
    Flexicon.find({themaId : themaId}, function (err, book) {
        if (err) {
            console.log(err);
            callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
            return;
        }
        callback(maakResponse("het zoeken naar de Flexicon-inzendingen is gelukt.", book));
    });
};

/**
    Hier worden alle inzendingen van een specifiek origineel woord gezocht
    @woordId : Het id van het origineele woord
*/
exports.getFlexiconByWoord = function (woordId, callback) {
    'use strict';
    Flexicon.find({origineelId : woordId}, function (err, book) {
        if (err) {
            console.log(err);
            callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
            return;
        }
        callback(maakResponse("het zoeken naar de Flexicon-inzendingen is gelukt.", book));
    });
};

/**
    Hier wordt één inzending uit het flexicon gezocht
    @flexiconId : het id van de inzending
*/
exports.getOneFlexicon = function (flexiconId, callback) {
    'use strict';
    Flexicon.findOne({_id : flexiconId}, function (err, book) {
        if (err) {
            console.log(err);
            callback(maakResponse("het zoeken naar de Flexicon-inzending is mislukt.", {}));
            return;
        }
        callback(maakResponse("het zoeken naar de Flexicon-inzending is gelukt.", book));
    });
};

/**
    Hier worden alle inzendingen met het opgegeven tag gezocht
    @tag : de gezochte tag
*/
exports.getFlexiconByTag = function (tag, callback) {
    'use strict';
    var flexiconsMetTags = [],
        checkTags = function (flexicon) {
            var i;
            for (i = 0; i < flexicon.tags.length; i += 1) {
                if (flexicon.tags[i].toLocaleLowerCase().indexOf(tag) !== -1) {
                    flexiconsMetTags[flexiconsMetTags.length] = flexicon;
                }
            }
        },
        zoekFlexiconsMetTags = function (flexicons) {
            var i;
            for (i = 0; flexicons.length; i += 1) {
                checkTags(flexicons[i]);
            }
            callback(maakResponse("Het ophalen van de Flexicons is gelukt.", flexiconsMetTags));
        },
        zoekAlleFlexicons = function () {
            Flexicon.find(function (err, book) {
                if (err) {
                    console.log(err);
                    callback(maakResponse("het zoeken naar de Flexicon-inzendingen is mislukt.", {}));
                    return;
                }
                zoekFlexiconsMetTags(book);
            });
        };
    zoekAlleFlexicons();
};