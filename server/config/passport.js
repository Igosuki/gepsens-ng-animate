var passport = require('passport')
	, passportGithub = require('passport-github')
	, passportFacebook = require('passport-facebook')
  , User = require('../models/user')
  , LocalStrategy = require('passport-local').Strategy
  , _ = require('underscore');

var configurePassport = function(app, config) {
  console.log("Passport config : %s", config);
  if(config.providers.github) {
    passport.use('github', new passportGithub.Strategy({
      clientID : config.github.id,
      clientSecret : config.github.secret,
      callbackURL : config.github.callbackURL,
      passReqToCallback : true
    }, function(req, accessToken, refreshToken, profile, done) {
      console.log("Github user %s", JSON.stringify(profile));
      User.findOne({
          "accounts.github.id": profile.id
      }, function(err, user) {
          if (err) {
              return done(err);
          }
          var github = _.extend(profile._json, {
              id: profile.id, 
              token: accessToken, 
              login: profile.username
          });
          console.log("Github %s", JSON.stringify(github));
          if (!user) {
              user = new User({
                email: profile._json.email, 
                login: profile.username,
                displayName : profile.displayName || profile.login,
                default_currency : {
                  sign : '$'
                },
                image_url : profile._json.avatar_url,
                accounts: {
                  github: github
                }
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              if(user.accounts.github) {
                user.accounts.github.token = accessToken;
              } else {
                user.accounts.github = github;
              }
              return done(err, user);
          }
      });
    }));
  }

  if(config.providers.twitter) {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({
                'twitter.id_str': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        provider: 'twitter',
                        twitter: profile._json
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
  }

  if(config.providers.facebook) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'facebook',
                        facebook: profile._json
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
  }

  if(config.providers.google) {
    passport.use(new GoogleStrategy({
            consumerKey: config.google.clientID,
            consumerSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'google',
                        google: profile._json
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
      ));
  }

  passport.use('local', new LocalStrategy(function(username, password, done) {
    User.findOne({ login: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log("Local passport error %s", err);
          return done(err);
        }
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
};

module.exports = passport;
module.exports.configure = configurePassport;