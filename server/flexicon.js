/**
 * Created by david on 17-05-14.
 */

var express  = require('express'),
    app      = express(),
    configServer = require('./config/server.js'),
    port     = process.env.PORT || configServer.port,
    multerConfig = require('./config/multer.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash 	 = require('connect-flash'),
    path     = require('path'),
    configDB = require('./config/database.js'),
    bodyParser = require('body-parser'),
    serveFavicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    errorhandler = require('errorhandler'),
    multer  = require('multer'),
    morgan = require('morgan');

mongoose.connect(configDB.url); // connect to our database

app.set('port', port);
app.set('title', 'Flexicon urban dictionairy');
app.use(serveFavicon("../client/images/favicon.png"));
app.use(bodyParser.json());
app.use(multer(multerConfig));
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser('madMen'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(errorhandler());
app.use(morgan({ format: 'dev', immediate: true })); // log every request to the console
app.use(bodyParser()); // get information from html forms
app.use(cookieSession({ secret: 'madMen' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration
require('./routes/routes.js')(app);

app.listen(port);
console.log('The Flexicon app is active on port: ' + port);
