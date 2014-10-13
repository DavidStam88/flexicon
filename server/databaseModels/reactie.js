/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');

/**
    Het reactie model:
    @gebruikerId   : Het gebruikerId van de maker van het slangwoord
    @inzendingId   : Het id van de inzending waar op gereageerd word
    @boodschap     : De inhoud van de reactie
    @datum         : Wordt niet opgegeven en bij aanmaak van de reactie geset
*/
var reactieSchema = mongoose.Schema({
    gebruikerId : {type : String, required : true},
    inzendingId: {type : String, required : true},
    boodschap : {type : String, required : true},
    datum : { type: Date, default: Date.now }
}, {collection : "reacties"});

/**
    Hier wordt gecontroleerd of alle required velden wel ingevuld zijn. Dit wordt altijd uitgevoerd voordat er een reactie aangemaakt wordt
*/
reactieSchema.methods.checkFields = function (fields) {
    'use strict';
    if (fields.gebruikerId && fields.inzendingId && fields.boodschap) {
        return true;
    }
    return false;
};

/**
    Hier wordt gecontroleerd of de boodschap niet te klein is
*/
reactieSchema.methods.validateBoodschap = function (boodschap) {
    'use strict';
    if (boodschap.length > 2) {
        return true;
    }
    return false;
};

module.exports = mongoose.model('reactie', reactieSchema);