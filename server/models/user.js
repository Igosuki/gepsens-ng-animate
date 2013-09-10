var mongoose = require('mongoose')
	mongooseTypes = require('mongoose-types'),
	findOrCreate = require('mongoose-findorcreate'),
	bcrypt = require('bcrypt'),
	timestamps = require('mongoose-timestamp');

var Account = {
	id: String,
	token: String,
	login: String,
	secret: String
};

var userSchema = new mongoose.Schema({
	login: String,
	email: String,
	password: String,
	fname: String,
	lname: {
		type: String,
		trim: true
	},
	default_currency: {
		sign: String
	},
	roles: Array,
	displayName: String,
	accounts: {
		github: {}
	},
	image_url: String,
	certified: Boolean,
	resources: [{type: mongoose.Schema.ObjectId, ref: 'Resource'}],
});

userSchema.plugin(findOrCreate);
userSchema.plugin(timestamps);

// Bcrypt middleware
userSchema.pre('save', function(next) {
 	
    var user = this;
    var isModified = user.isModified('password')
    if(!isModified) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});
 
// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

        if(err) {
        	console.log("Err comparing passwords %s "); 
        	return cb(err);
        }
        cb(null, isMatch);
    });
};


// userSchema.methods.comparePassword = function(pwd, callback) {
// 	if(pwd == this.password) {
// 		cb(null, true);
// 	}
// }

module.exports = mongoose.model('User', userSchema);

