/**
 * Created by david on 11-06-14.
 */

var expect = require("chai").expect,
    Gebruiker = require("../databaseModels/gebruiker.js"),
    Inzending = require("../databaseModels/inzending.js"),
    Reactie = require("../databaseModels/reactie.js");

describe("Gebruiker", function(){
        var gegevens =  {
                'gebruikersnaam' : "Peter",
                'wachtwoord' : "admin",
                'bevestigWachtwoord' : "admin",
                'email' : "p.deBoot@gmail.com"
            };
    describe("#checkfields()", function(){
        it("should check if al fiels are present and if so, return true", function(){
            var gebruiker = new Gebruiker(),
                results = gebruiker.checkFields(gegevens);

            expect(results).to.equals(true);
        });
    });
    describe("#checkGebruikersnaam()", function(){
        it("should check if username is valid.", function(){
            var gebruiker = new Gebruiker(),
                results = gebruiker.checkGebruikersnaam(gegevens.gebruikersnaam);

            expect(results).to.equals(true);
        });
    });
    describe("#checkEmail()", function(){
        it("should check if email is valid.", function(){
            var gebruiker = new Gebruiker(),
                results = gebruiker.checkEmail(gegevens.email);
            expect(results).to.equals(true);
        });
    });
    describe("#checkWachtwoord()", function(){
        it("should check if password is valid and the same as confirmPassword.", function(){
            var gebruiker = new Gebruiker(),
                results = gebruiker.checkWachtwoord(gegevens.wachtwoord, gegevens.bevestigWachtwoord);
            expect(results).to.equals(true);
        });
    });
});

describe("Inzending", function(){
        var gegevens =  {
            gebruikerId : "4892357_O8472784235",
            'video' : "Dit wordt een video",
            themaId : "4892357_O8472784235",
            origineelId : "4892357_O8472784235",
            definitie : "FoShizzle?",
            toelichting : "Als je iets meent.",
            lettertypeId : "4892357_O8472784235",
            lettergrootte : 75,
            afbeeldingId : "4892357_O8472784235",
            flexpoints : 12,
            tags : ["Hallo", "Hoi", "Doei"]
        };

    describe("#checkfields()", function(){
        it("should check if al fiels are present and if so, return true", function(){
            var inzending = new Inzending(),
                results = inzending.checkFields(gegevens);

            expect(results).to.equals(true);
        });
    });
    describe("#validateLetterGrootte()", function(){
        it("should check if al fiels are present and if so, return true", function(){
            var inzending = new Inzending();
            var results = inzending.validateLetterGrootte(gegevens.lettergrootte);

            expect(results).to.equals(true);
        });
    });
    describe("#validateDefinitie()", function(){
        it("Validates the definition.", function(){
            var inzending = new Inzending(),
                results = inzending.validateDefinitie(gegevens.definitie);
            expect(results).to.equals(true);
        });
    });
    describe("#validateTags()", function(){
        it("Validates the tags in a post.", function(){
            var inzending = new Inzending(),
                results = inzending.validateTags(gegevens.tags);
            expect(results).to.equals(true);
        });
    });
    describe("#validateFlexpoints()", function(){
        it("Validates if flexpoint = plus or min.", function(){
            var inzending = new Inzending(),
                gegevens = {
                    "flexpoints" : "plus"
                },
                results = inzending.checkFieldsFlexpoints(gegevens);
            expect(results).to.equals(true);
        });
    });
});

describe("Reactie", function(){
    var gegevens = {
        'gebruikerId' : "908905423489259",
        'inzendingId' : "908345894235",
        'boodschap' : "Boodschap"
    };

    describe("#checkfields()", function(){
        it("Checks if all the fields are present.", function(){
            var reactie = new Reactie(),
                results = reactie.checkFields(gegevens);

            expect(results).to.equals(true);
        });
    });
    describe("#validateBoodschap()", function(){
        it("should check if al fiels are present and if so, return true", function(){
            var reactie = new Reactie();
            var results = reactie.validateBoodschap(gegevens.boodschap);

            expect(results).to.equals(true);
        });
    });
});
