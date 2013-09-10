var express = require('express')
    , mongoose = require('mongoose')
    , MongoStore = require('connect-mongo')(express)
    , passport = require('passport')
    , path = require('path');   



module.exports = function(app, config, env){

	app.configure(function(){
        app.set('port', config.port);
        app.set('views', config.root + '/server/views');
        app.set('view engine', 'jade');
        if (config.basicAuthProtection) {
            app.use(express.basicAuth(config.prodUser, config.prodPassword));
        }
        app.use(express.compress());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        var staticPath = path.join(config.root, config.public || 'dist');
        app.use(express.static(staticPath));
        app.use(express.favicon(staticPath+ '/favicon.ico'));
        if (env === 'development') {
            app.use(express.static(path.join(config.root, '.tmp')));
            app.use(express.errorHandler());
            app.use(express.logger('dev'));
        }
        app.use(express.cookieParser(config.cookieSecret));
        app.use(express.cookieSession());
        app.use(express.csrf({value: csrfValue}));

        app.use(function(req, res, next) {
          res.cookie('XSRF-TOKEN', req.session._csrf);
          next();
        });
        app.use(express.session({
            secret: config.cookieSecret,
            maxAge: new Date(Date.now() + 3600000),
            httpOnly: false,
            store: new MongoStore(
                {db: mongoose.connection.db},
                function(err){
                    console.log(err || 'connect-mongodb setup ok');
                })
        }));
        app.use(passport.initialize());
        app.use(passport.session({
            cookie: {
                path: '/'
              , httpOnly: false
              , maxAge: 14 * 24 * 60 * 60 * 1000
            }
        }));
        app.use(app.router);
    });

    var csrfValue = function(req) {
      var token = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.headers['x-csrf-token'])
        || (req.headers['X-XSRF-TOKEN']);
      console.log("Token %s", token);
      return token;
    };
};
