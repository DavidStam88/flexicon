/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose'),
    lettertype = require('../databaseModels/lettertype.js');

/**
    Het inzending model:
    @gebruikerId   : Het gebruikerId van de maker van het slangwoord
    @themaId       : Het id van het thema waar de afbeeldingen/lettertypes etc in staan wordt automatisch doorgegeven
    @video         : Het pad naar de video lokaal (wordt niet gebruikt dor missende functionaliteit)
    @origineelId   : Het id van het originele woord uit het woordenboek wordt automatisch doorgegeven
    @definitie     : Het daadwerkelijke slangwoord
    @toelichting   : De toelichting voor de definite met een kleine uitleg
    @lettertypeId  : Het id van het lettertype deze wordt automatisch doorgegeven
    @lettergrootte : De daadwerkelijke grootte van het Lettertype ligt tussen de 65 -75
    @afbeeldingId  : Het id naar de afbeelding wordt automatisch doorgegeven
    @flexpoints    : Het aantal flexpoints
    @tags          : een lijst met tags, dit zijn er maximaal 5.
    @datum         : Wordt niet opgegeven en bij aanmaak van de afbeelding geset
*/
var inzendingSchema = mongoose.Schema({
    gebruikerId : {type : String, required : true},
    themaId : {type : String, required : true},
    video : {type : String, required : true, default : "Dit wordt een video"},
    origineelId : {type : String, required : true},
    definitie : {type : String, required : true},
    toelichting : {type : String, required : true},
    lettertypeId : {type : String, required : true},
    lettergrootte : {type : Number, required : true},
    afbeeldingId : {type : String, required : true},
    flexpoints : {type : Number, default : 0},
    tags : [
        {type : String, required : true}
    ],
    datum : { type: Date, default : Date.now }
}, {collection : "inzendingen"});

/**
    Hier wordt gecontroleerd of alle required velden wel ingevuld zijn. Dit wordt altijd uitgevoerd voordat er een inzending aangemaakt wordt
*/
inzendingSchema.methods.checkFields = function (fields) {
    'use strict';
    if (fields.gebruikerId && fields.video && fields.origineelId && fields.definitie && fields.toelichting && fields.lettertypeId && fields.lettergrootte && fields.afbeeldingId && fields.tags) {
        return true;
    }
    return false;
};

/**
    Hier wordt gecontroleerd of de lettergrootte binnen de gelimiteerde range valt
*/
inzendingSchema.methods.validateLetterGrootte = function (letterGrootte) {
    'use strict';
    if (letterGrootte > 39 && letterGrootte < 80) {
        return true;
    }
    return false;
};

/**
    Hier word gecontroleerd of de definitie niet te lang is
*/
inzendingSchema.methods.validateDefinitie = function (definitie) {
    'use strict';
    if (definitie.length > 0 && definitie.length < 20) {
        return true;
    }
    return false;
};

/**
    Hier word gecontroleerd of de tags niet te lang is
*/
inzendingSchema.methods.validateTags = function (tags) {
    'use strict';
    if (tags.length < 1) {
        return false;
    }
    var i;
    for (i = 0; i < tags.length; i += 1) {
        if (!tags[i].length > 0 && !tags[i].length < 15 && (tags[i].indexOf(' ') !== -1)) {
            return false;
        }
    }
    return true;
};

/**
    Hier wordt gecontroleerd of de juiste commandos worden doorgegeven voor het ophogen/verlagen van de flexpoints
*/
inzendingSchema.methods.checkFieldsFlexpoints = function (gegevens) {
    'use strict';
    if (gegevens.flexpoints === "plus" || gegevens.flexpoints === "min") {
        return true;
    }
    return false;
};

module.exports = mongoose.model('inzending', inzendingSchema);