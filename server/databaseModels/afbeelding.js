/* Created by Wessel on 21/05/14 */

var mongoose = require('mongoose');

/**
    Het afbeelding model:
    @themaId   : Deze moet meegegeven worden vanuit een thema
    @naam      : De naam waar de afbeelding aan herkent kan worden
    @path      : Het pad naar de daadwerkelijke afbeelding
    @thumbnail : Het pad naar de thumbnail
    @datum     : Wordt niet opgegeven en bij aanmaak van de afbeelding geset
*/
var afbeeldingSchema = mongoose.Schema({
    themaId : {type : String, required : true},
    naam : {type : String, required : true},
    path : {type : String, required : true},
    thumbnail : {type : String, required : true},
    datum : {type : Date, default : Date.now()}
}, {collection : "afbeeldingen"});

module.exports = mongoose.model('afbeelding', afbeeldingSchema);