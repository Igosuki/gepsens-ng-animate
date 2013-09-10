var _ = require('underscore');
var baseUrl = "http://dev.example.com";
var getAuthUrl = function(provider) {
	return baseUrl+'/auth/'+provider+'/callback';
}
var config = {
	root: require('path').join(__dirname, '/../..'),
	app: {
		name: 'APP_NAME'
	},
	cookieSecret: 'COOKIE_SECRET',
	providers : {
		// github : {
		// 	id : 'GITHUB_ID',
		// 	secret : 'GITHUB_SECRET',
		// 	callbackURL : getAuthUrl('github');
		// },
		// facebook : {
	 //        clientID: 'FB_ID', 
	 //        clientSecret: 'FB_SECRET',
	 //        scope: ['email', 'user_about_me'],
	 //        callbackURL : getAuthUrl('facebook');
	 //    },
	 //    google : {
	 //        clientID: 'GOOGLE_ID', 
	 //        clientSecret: 'GOOGLE_SECRET',
	 //        scope: 'https://www.google.com/m8/feeds',
	 //        callbackURL : getAuthUrl('google');
	 //    },
	 //    twitter : {
	 //        clientID: 'TWITTER_ID', 
	 //        clientSecret: 'TWITTER_SECRET',
	 //        callbackURL : getAuthUrl('twitter');
	 //    }		
	},
    basicAuthProtection: true,
	prodUser: 'mean',
	prodPassword: 'mean',
};

var envs = {
	development : {
		port: 9000,
		host: 'localhost',
		db: 'mongodb://localhost/'+config.app.name+'-test',
		redis : {
			secure:false, 
			port: 6379,
			host: 'localhost'
		},
		staticUrl: 'http://localhost:9000',
		public: 'app',
		stripe : {
			secret: 'STRIPE_SECRET',
			id: 'STRIPE_ID'
		},
		basicAuthProtection: false,
	},
	cloudfoundry: {
		port: process.env.VCAP_APP_SUPPORT || 9000,
		host: (function() {
			if(process.env.VCAP_APPLICATION) 
				return JSON.parse(process.env.VCAP_APPLICATION).application_uris[0];
			else 
				return null;
		})() || 'localhost',
		db: (function() {
			if(process.env.VCAP_SERVICES) {
		        var services = JSON.parse(process.env.VCAP_SERVICES);
		        var serviceKey = Object.keys(services)[0]
		        return services[serviceKey][0].credentials.uri;
		    } else {
		    	return null;
		    }
		})() || 'mongodb://localhost/test',
		staticUrl: 'PROD_STATIC_URL',
		public: 'dist'
	},
	digitalocean: {
		host: 'HOSTNAME',
		port: process.env.PORT || 80,
		secure_port: '443',
		db: 'mongodb://'+this.host+'/'+config.app.name+'-test',
		staticUrl: 'PROD_STATIC_URL',
		public: 'dist',
		stripe : {
			secret: 'STRIPE_PROD_SECRET',
			id: 'STRIPE_PROD_ID'
		}
	}
}

var finalConfig = {};

_.each(envs, function(value, key) {
	finalConfig[key] = _.extend(_.omit(config, ''), value);
});

module.exports = finalConfig;