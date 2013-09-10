var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mongooseExpress = require('express-mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , fs = require('fs');

var app = express();

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0){
    require(models_path + '/' + file);
  }
});

require('./config/mongoose')(app,config,env);
require('./config/redis')(app,config,env);
require('./config/express')(app, config, env);
require('./config/passport').configure(app, config);
require('./config/stripe')(app, config);
require('./routes')(app, config);

app.listen(config.port, function(){
  console.log('Express\' server listening on port ' + app.get('port'));
});
