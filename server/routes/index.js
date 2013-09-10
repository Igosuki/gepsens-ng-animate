var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto'),
    URLSafeBase64 = require('urlsafe-base64'),
    _ = require('underscore');

var mainRoutes = [];

var requireRoutes = function(dir, app) {
    var files = fs.readdirSync(dir).filter(function(file) {
        return path.join(__dirname, file) != __filename;
    });

    files.forEach(function(file) {
        var absolutePath = path.join(dir, file);

        var stat = fs.statSync(absolutePath);

        if (stat.isFile()) {
            try {
                var defineRoutes = require(absolutePath);
                console.log("Defining route : %s", JSON.stringify(defineRoutes));
                defineRoutes(app);

                if (defineRoutes.meta) {
                    mainRoutes.push(defineRoutes.meta);
                }
            } catch (e) {
                console.log('Could not require route "' + absolutePath + '" due to exception', e);
            }
        } else if (stat.isDirectory()) {
            // Scan the directory recursive
            requireRoutes(path.join(dir, file), app);
        }
    });
}

var routes = function(app, config) {
    requireRoutes(__dirname, app);

    _.forEach(config.providers, function(e) {
        var provider = e;
        app.get('/auth/'+provider, function(req, res, next) {
          var originURL = req.params.origin?'?'+req.params.origin:''
          var callbackURL = config[provider].callbackURL + originURL;
          console.log("CallbackURL %s %s", provider, callbackURL);
          passport.authenticate(provider, {callbackURL: callbackURL})(req,res,next);

        });
        app.get('/auth/'+provider+'/callback', passport.authenticate(e, { failureRedirect: '/login' }),
            function(req, res) {
              var originURL = req.params.origin?'/'+req.params.origin:'';
              console.log("Redirecting to origin %s", config.staticUrl+originURL);
                res.redirect(originURL?originURL:config.staticUrl);
                }
            );
    });

}

module.exports = routes;
