var stripe = require('stripe');

module.exports = function(app, config) {
	this.api = stripe(config.stripe.secret);
}