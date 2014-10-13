/**
 * Created by david on 31-05-14.
 */

var Lettertype = require('../../databaseModels/lettertype.js'),
    /**
      Het object wat telkens wordt terug gestuurd nadat deze word ingevuld
    */
    maakResponse = function (message, data) {
        return {
            "datumRequest" : Date.now(),
            "message" : message,
            "data" : data
        };
    };

/**
  Hier worden alle lettertypes van een opgegeven thema opgezocht
  @themaId : het id van het opgegeven thema waarin gezocht moet worden
*/
exports.getLettertypes = function (themaId, callback) {
    'use strict';
   Lettertype.find({themaId : themaId}, function (err, lettertypes) {
       if (err) {
            callback(maakResponse("Het ophalen van de fonts is mislukt"), {});
       } else {
            callback(maakResponse("Het ophalen van de fonts is gelukt", lettertypes));
       }
   });
};

/**
  Hier wordt een enkel lettertype opgezocht
  @lettertypeId : het id van het te zoeken lettertype
*/
exports.getLettertype = function (lettertypeId, callback) {
    'use strict';
    Lettertype.findOne({_id : lettertypeId}, function (err, lettertype) {
        if (err) {
            console.log(err);
            callback(maakResponse("Het ophalen van het lettertype is mislukt", {}));
        } else {
            callback(maakResponse("Het ophalen van het lettertype is gelukt", lettertype));
        }
    });
};