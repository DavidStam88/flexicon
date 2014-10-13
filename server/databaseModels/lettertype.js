/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');

/**
    Het lettertype model:
    @themaId       : Het id van het thema waar de afbeeldingen/lettertypes etc in staan wordt automatisch doorgegeven
    @naam          : De naam waar het lettertype aan herkent kan worden
    @datum         : Wordt niet opgegeven en bij aanmaak van de afbeelding geset
*/
var lettertypeSchema = mongoose.Schema({
    themaId : {type : String, required : true},
    naam : {type : String, required : true},
    datum : { type: Date, default: Date.now }
}, {collection : "lettertypes"});

module.exports = mongoose.model('lettertype', lettertypeSchema);