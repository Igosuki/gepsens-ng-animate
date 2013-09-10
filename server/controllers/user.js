
/*
 * GET users listing.
 */

 var userm = require('../models/user.js')
 	 , passport = require('passport');
 var user = userm;

 exports.list = function(req, res){
	user.find({}, function(err, docs) {
		res.send(docs);
	});
 };

 exports.load = function(req,res) {
	res.json(req.user);	
 };

 exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

 
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};