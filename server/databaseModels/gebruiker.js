/**
 * Created by david on 17-05-14.
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/**
    Het gebruiker model:
    @gebruikersnaam : de username die door de gebruiker zelf is opgegeven
    @email          : de email die is opgegeven door de gebruiker zelf 
    @wachtwoord     : het wachtwoord van de gebruiker deze is encrypted dmv bcrypt
    @avatar         : het pad naar de avatarafbeelding, bij het registreren wordt een 
                      standaard image meegegeven hierna dan de gebruiker het zelf wijzigen
    @favorieten     : een lijst met id van inzendingen
    @datum          : Wordt niet opgegeven en bij aanmaak van de gebruiker geset
*/

var gebruikerSchema = mongoose.Schema({
    gebruikersnaam : {type : String, required : true},
    email : {type : String, required : true},
    wachtwoord : {type : String, required : true},
    avatar : {type : String, default: "./images/uploads/standaard.png"},
    favorieten : [],
    datum : { type: Date, default: Date.now }
}, {collection : "gebruikers"});

/**
    Hier wordt gecontroleerd of alle required velden wel ingevuld zijn. Dit wordt altijd uitgevoerd voordat er een gebruiker aangemaakt wordt
*/
gebruikerSchema.methods.checkFields = function (fields) {
    'use strict';
    if (fields.wachtwoord && fields.email && fields.bevestigWachtwoord && fields.gebruikersnaam) {
        return true;
    }
    return false;
};

/**
    Hier wordt de lengte van de gebruikersnaam gecontroleerd
*/
gebruikerSchema.methods.checkGebruikersnaam = function (gebruikersnaam) {
    'use strict';
    if (gebruikersnaam.length > 2) {
        return true;
    }
    return false;
};

/**
    Hier wordt gecontroleerd of het email adres wel een email adres is
*/
gebruikerSchema.methods.checkEmail = function (email) {
    'use strict';
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/**
    Hier wordt gecontroleerd of het wachtwoord overeenkomt met het controlewachtwoord  
*/
gebruikerSchema.methods.checkWachtwoord = function (wachtwoord, bevestigWachtwoord) {
    'use strict';
    if (wachtwoord === bevestigWachtwoord && wachtwoord.length > 4) {
        return true;
    }
    return false;
};

/**
    Hier wordt het wachtwoord geëncrypt dmv bcrypt
*/
gebruikerSchema.methods.generateHash = function (wachtwoord) {
    'use strict';
    return bcrypt.hashSync(wachtwoord, bcrypt.genSaltSync(8), null);
};

/**
    Hier wordt gecontroleerd of het wachtwoord overeen komt met het geencrypte wachtwoord
*/
gebruikerSchema.methods.validateWachtwoord = function (wachtwoord) {
    'use strict';
    return bcrypt.compareSync(wachtwoord, this.wachtwoord);
};

/**
    Hier word gecontroleerd of de favorieten wel correct gevuld zijn, dit wordt uitgevoerd bij het toevoegen van een favoriet niet bij het creeeren van een gebruiker
*/
gebruikerSchema.methods.checkFavoerietenVelden = function (gegevens) {
    'use strict';
    if (gegevens.gebruikerId && gegevens.inzendingId) {
        return true;
    }
    return false;
};

module.exports = mongoose.model('gebruiker', gebruikerSchema);