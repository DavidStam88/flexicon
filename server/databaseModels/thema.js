/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');


/**
    Het thema model:
    @naam            : De naam waar het thema aan herkent kan worden
    @themaAfbeelding : Het pad naar de thema afbeelding
    @datum           : Wordt niet opgegeven en bij aanmaak van het thema geset
*/
var themaSchema = mongoose.Schema({
    naam : {type : String, required: true},
    themaAfbeelding : {type : String, required : true},
    datum : { type: Date, default: Date.now }
}, {collection : "themas"});

/**
    Hier wordt gecontroleerd of alle required velden wel ingevuld zijn. Dit wordt altijd uitgevoerd voordat er een reactie aangemaakt wordt
*/
themaSchema.methods.checkFields = function (fields) {
    'use strict';

    if (fields.naam && fields.lettertypes && fields.kleurcodes) {
        return true;
    }
    return false;
};

module.exports = mongoose.model('thema', themaSchema);