/**
 * Created by david on 11-06-14.
 */

var expect = require("chai").expect,
    gebruikerActions = require("../controllers/dbActions/gebruikerActions.js"),
    afbeeldingActions = require("../controllers/dbActions/afbeeldingActions.js"),
    woordenboekActions = require("../controllers/dbActions/woordenboekActions.js"),
    flexiconActions = require("../controllers/dbActions/flexiconActions.js"),
    mongoose = require('mongoose'),
    config = require('../config/database.js');

describe("gebruikerActions", function(){

    before(function (done) {
        mongoose.connect('mongodb://' + config.url);
        mongoose.connection.on('connected', function() {
        done();
        });
    });

    describe("#getGebruikers()", function(){
        it("Moet alle gebruikers teruggeven.", function(done){
            gebruikerActions.getGebruikers(function (resp) {
                expect(resp.data[0]).to.have.a.property("_id");
                expect(resp.data[0]).to.have.a.property("gebruikersnaam");
                expect(resp.data[0]).to.have.a.property("wachtwoord");
                expect(resp.data[0]).to.have.a.property("email");
                expect(resp.data[0]).to.have.a.property("favorieten");
                expect(resp).to.have.a.property("message", "Het zoeken naar gebruikers is gelukt.");
                expect(resp).to.have.a.property("data");
                gebruikersId = resp.data[0]._id;
                done();
            });
        });
    });

    describe("#getGebruiker()", function(){
        it("Moet één gebruiker teruggeven.", function(done){
            gebruikerActions.getGebruikers(function (res) {
                gebruikerActions.getGebruiker(res.data[0]._id, function (resp) {
                    expect(resp).to.have.a.property("message", "Het zoeken naar een gebruiker is gelukt.");
                    expect(resp).to.have.a.property("data");
                    expect(resp.data).to.have.a.property("_id");
                    done();
                });
            });
        });
    });

    describe("#createGebruiker()", function(){
        var gegevens = {
            'gebruikersnaam' : "Peter",
            'wachtwoord' : "admin",
            'bevestigWachtwoord' : "admin",
            'email' : "p.deBoot@gmail.com"
        }
        it("Moet één gebruiker aanmaken.", function(done){
            gebruikerActions.createGebruiker(gegevens, function (resp) {
                expect(resp).to.have.a.property("message");
                expect(resp).to.have.a.property("data");
                done();
            });
        });
    });

    describe("#updateGebruiker()", function(){
        it("Moet één gebruiker updaten.", function(done){

            gebruikerActions.getGebruikers(function (resp) {
                var gegevens = {
                    '_id' : resp.data[0]._id,
                    'gebruikersnaam' : "Peter",
                    'wachtwoord' : "admin",
                    'bevestigWachtwoord' : "admin",
                    'email' : "p.deBoot@gmail.com"
                }
                gebruikerActions.updateGebruiker(gegevens, function (resp) {
                    expect(resp).to.have.a.property("message");
                    expect(resp).to.have.a.property("data");
                    done();
                });
            });
        });
    });

    describe("#wachtwoordVergeten()", function(){
        this.timeout(15000);
        it("Moet de gebruiker een email met een nieuw wachtwoord sturen.", function(done){

            gebruikerActions.getGebruikers(function (resp) {
                var gegevens = {
                    'email' : resp.data[0].email
                }
                gebruikerActions.wachtwoordVergeten(gegevens, function (resp) {
                    expect(resp).to.have.a.property("message");
                    expect(resp).to.have.a.property("data");
                });
                done();
            });
        });
    });
});

describe("woordenboekActions", function(){
    describe("#getWoordVanDeWeek()", function(){
        it("Haalt het woord van de week op.", function(done){
            woordenboekActions.getWoordVanDeWeek(function (resp) {
                expect(resp).to.have.a.property("message");
                expect(resp).to.have.a.property("data");
                expect(resp.data).to.have.a.property("_id");
                done();
            });
        });
    });
    describe("#getWoord()", function(){
        it("Haalt een woord op.", function(done){
            woordenboekActions.getWoordVanDeWeek(function (resp) {
                woordenboekActions.getWoord(resp.data._id, function (res) {
                    expect(res).to.have.a.property("message");
                    expect(res).to.have.a.property("data");
                    expect(res.data).to.have.a.property("_id");
                });
                done();
            });
        });
    });
});

describe("flexiconActions", function(){
    describe("#getFlexicon()", function(){
        it("Haalt het Flexicon-woordenboek op.", function(done){
            flexiconActions.getFlexicon(function (resp) {
                expect(resp).to.have.a.property("message");
                expect(resp).to.have.a.property("data");
                expect(resp.data[0]).to.have.a.property("_id");
                done();
            });
        });
    });
});

describe("afbeeldingActions", function(){
    describe("#getAfbeelding()", function(){
        it("Haalt alle afbeeldingen op.", function(done){
            this.timeout(2000);
            var id = "897439392494385";
            afbeeldingActions.getAfbeelding(id, function (resp) {;
                expect(resp).to.have.a.property("message");
                expect(resp).to.have.a.property("data");
                done();
            });
        });
    });
});