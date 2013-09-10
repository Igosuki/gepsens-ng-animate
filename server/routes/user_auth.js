var user = require('../models/user'),
	mapper = require('../lib/model-mapper'),
	passport = require('passport');

module.exports = function(app) {

	app.param('userId', function(req, res, next, id) {
        user.findById(id, function(err, userEntity) {
            if (err) {
                return next(err);
            }
            
            if (!userEntity) {
                return res.send(404);
            }
            console.log("Found user : ", JSON.stringify(userEntity));
            res.locals.user = userEntity;
            next();
        });
    });

	app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err) }
	    if (!user) {
	      req.session.messages =  [info.message];
	      return res.send(401);
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.json(req.user);
	    });
	  })(req, res, next);
	});

	app.get('/users', isAdmin, function(req,res) {
		user.find({}, function(err, docs) {
			res.send(docs);
		});
	});

	app.get('/users/:userId', function(req, res) {
		var user = res.locals.user
		res.json({displayName: user.displayName});
	});

	app.put('/users/:userId', function(req, res) {
		var user = res.locals.user;
		console.log("Map %s to %s", req.body.password, user);
        mapper.map(req.body).to(user);
		user.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
	});

    app.get('/auth', isAuthenticated, function(req,res) {
    	console.log("Requested user %s", JSON.stringify(req.user));
		res.json(req.user);	
	});
	
    app.get('/logout', isAuthenticated, function(req, res) {
	  req.logout();
	  res.redirect('/');
	});
    
    function isAdmin(req, res, next) {
    	req.user.email == 'igosuki@gmail.com' ? next() : res.status(403);
    }

    function isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) { return next(); }
        res.send(401);
    }
};

module.exports.meta = {
    name : 'User',
    route : '/users'
}