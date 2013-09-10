var redis = require("redis");

module.exports = function(app, config, env) {
    if(!config.redis) {
        return;
    }
    client = redis.createClient(config.redis.port, config.redis.host);
    if(config.redis.secure) {
        client.auth(config.redis.password, function() {
            console.log("Securely authenticated to Redis !");
        })
    }
    client.on("error", function (err) {
        console.log("Error " + err);
    });
}
    