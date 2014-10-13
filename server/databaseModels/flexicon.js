/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');

/**
    Het flexicon model (het boek waar de woorden van de week in opgeslagen worden):
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

    dit komt overeen met de inzending maar er was een probleem met het inserten van dat model vandaar dat deze is gekopieerd
*/
var flexiconSchema = mongoose.Schema({
    gebruikerId : {type : String, required : true},
    themaId : {type : String, required : true},
    video : {type : String, required : true},
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
}, {collection : "flexicon"});

module.exports = mongoose.model('flexicon', flexiconSchema);