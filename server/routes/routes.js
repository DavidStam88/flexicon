/**
 * Created by david on 19-05-14.
 */

var gebruikerController = require('../controllers/gebruikerController.js'),
	reactieController = require('../controllers/reactieController.js'),
    passport = require('passport'),
    inzendingController = require('../controllers/inzendingController.js'),
    flexiconController = require('../controllers/flexiconController.js'),
    woordenboekController = require('../controllers/woordenboekController.js'),
    themaController = require('../controllers/themaController.js'),
    lettertypeController = require('../controllers/lettertypeController.js'),
    afbeeldingController = require('../controllers/afbeeldingController.js'),
    testDataA = require('../controllers/maakThemasGebruikersWoorden.js'),
    //testDataB = require('../controllers/maakInzendingen.js'),
    testDataB = require('../controllers/maakTestData.js'),
    themaController = require('../controllers/themaController.js'),
    zoekenController = require('../controllers/zoekenController.js'),
    fs = require('fs');

module.exports = function (app) {
    app.get("/gebruikers/:id", gebruikerController.getGebruiker);
    app.post("/gebruikers", gebruikerController.createGebruiker);
    app.put("/gebruikers", gebruikerController.checkLogin, gebruikerController.updateGebruiker);
    app.delete("/gebruikers/:id", gebruikerController.checkLogin, gebruikerController.deleteGebruiker);
    app.post("/wachtwoordVergeten", gebruikerController.wachtwoordVergeten);

    app.post('/gebruikers/favorieten', gebruikerController.addFavoriet);
    app.delete('/gebruikers/:gebruikerId/:inzendingId', gebruikerController.deleteFavoriet);
    app.get('/gebruikers/favorieten/:id', gebruikerController.getFavorieten);
    app.post('/avatar', gebruikerController.veranderAvatar);

    app.get('/afbeelding/:id', afbeeldingController.getAfbeelding);
    app.get('/afbeeldingen/thema/:id', afbeeldingController.getAfbeeldingenThema);

    app.get('/flexicon', flexiconController.getFlexicon);
    app.get('/flexicon/thema/:id', flexiconController.getFlexiconByThema);
    app.get('/flexicon/woord/:id', flexiconController.getFlexiconByWoord);
    app.get('/flexicon/:id', flexiconController.getOneFlexicon);
    app.get('/flexicon/tag/:id', flexiconController.getFlexiconByTag);

    app.get("/inzendingen/:id", inzendingController.getInzending);
    app.get('/inzendingen/woord/:id', inzendingController.getInzendingenWoord);
    app.get('/inzendingen/gebruiker/:id', inzendingController.getInzendingenGebruiker);
    app.post('/inzendingen', gebruikerController.checkLogin, inzendingController.createInzending);
    app.delete('/inzendingen/:id', gebruikerController.checkLogin, inzendingController.deleteInzending);

    app.get('/lettertype/:id', lettertypeController.getLettertype);
    app.get('/lettertypes/:id', lettertypeController.getLettertypes);

    app.get('/reacties/inzending/:id', reactieController.getReactiesByInzending);
    app.get('/reacties/gebruiker/:id', reactieController.getReactiesByGebruiker);
    app.post('/reacties', gebruikerController.checkLogin, reactieController.createReactie);
    app.delete('/reacties/:id', gebruikerController.checkLogin, reactieController.deleteReactie);

    app.get('/themas', themaController.getThemas);
    app.get('/themas/:id', themaController.getThema);

    app.post('/login', passport.authenticate('login', {successRedirect: '/login', failureRedirect : '/login'}));
    app.get('/logout', gebruikerController.logout);
    app.get('/login', gebruikerController.checkLogin, gebruikerController.login);

    app.get('/woordenboek', woordenboekController.getWoordenboek);
    app.get('/woordVanDeWeek', woordenboekController.getWoordVanDeWeek);
    app.get('/woordenboek/:id', woordenboekController.getWoord);
    app.get('/woordenboek/letter/:id', woordenboekController.getWoordenByLetter);

    app.post('/flexpoints', inzendingController.geefFlexpoint);

    app.get('/vulDataBaseThemasGebruikers', testDataA.maakTestData);
    app.get('/vulDataBaseWoorden', testDataA.maakWoorden);
    app.get('/vulDataBaseFlexicons', testDataB.maakFlexicons);
    app.get('/vulDataBaseInzendingen', testDataB.maakInzendingen);

    app.get('/zoeken/:id', zoekenController.getWoorden);


    /*
     cronjob
     app.post('/video', inzendingController.addVideo);
    */
};