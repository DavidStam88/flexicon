/**
 * Created by david on 17-05-14.
 */

var LocalStrategy = require('passport-local').Strategy;
var Gebruiker = require('../databaseModels/gebruiker');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Gebruiker.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'wachtwoord'
        },
        function (email, wachtwoord, done) {
            console.log(email + " " + wachtwoord);
            Gebruiker.findOne({ 'email': email }, function (err, gebruiker) {
                if (err) {
                    return done(err);
                }
                if (!gebruiker) {
                    return done(null, false);
                }
                if (!gebruiker.validateWachtwoord(wachtwoord)) {
                    return done(null, false);
                }
                return done(null, gebruiker);
            });
        }));
};