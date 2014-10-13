/**
 * Created by david on 31-05-14.
 */

var Afbeelding = require('../../databaseModels/afbeelding.js'),
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
  Hier worden alle afbeeldingen van een thema opgehaald
*/
exports.getAfbeeldingenThema = function (themaId, callback) {
    'use strict';
    Afbeelding.find({themaId : themaId}, function (err, afbeeldingen) {
        if (err) {
            console.log(err);
            callback(maakResponse("Het ophalen van de afbeeldingen is mislukt"), {});
        } else {
            callback(maakResponse("Het ophalen van de afbeeldingen is gelukt", afbeeldingen));
        }
    });
};

/**
  Hier wordt een specifieke afbeelding gezocht
*/
exports.getAfbeelding = function (afbeeldingId, callback) {
    'use strict';
   Afbeelding.findOne({_id : afbeeldingId}, function (err, afbeelding) {
       if (err) {
           console.log(err);
           callback(maakResponse("Het ophalen van de afbeelding is mislukt.", {}));
       } else {
           callback(maakResponse("Het ophalen van de afbeelding is gelukt.", afbeelding));
       }
   });
};