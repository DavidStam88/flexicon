/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');

/**
    Het woordenboek model (het boek waar de normale (te vervangen) woorden in opgeslagen worden): 
    @woord        : Het daadwekelijke woord die vervangen moet worden
    @tags         : De standaard tags die aan het woord gelinkt zijn, deze kunnen veranderd worden bij de creatie van een inzending
    @afbeeldingId : Het pad voor de achtergrond afbeelding
    @startDatum   : De datum wanneer er op een bepaald woord een inzending gemaakt kan worden
    @eindDatum    : De datum wanneer er op een nieuw woord een inzending gemaakt kan worden
    @datum         : Wordt niet opgegeven en bij aanmaak van het thema geset
*/
var woordenboekSchema = mongoose.Schema({
    woord : {type : String, required : true},
    tags : [],
    afbeeldingId : {type : String, required : true},
    startDatum : {type: Date, required : true},
    eindDatum : {type: Date, required : true},
    datum : {type: Date, default: Date.now}
}, {collection : "woordenboek"});

module.exports = mongoose.model('woordenboek', woordenboekSchema);