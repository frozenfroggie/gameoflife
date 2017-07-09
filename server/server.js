//babel setup
require('babel-register');

//express setup
const express = require('express');
const app = express();

//mongoose setup
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

//require few others npm packages..
const bodyParser = require('body-parser');
const helmet = require('helmet');

//..and files
const routes = require('./routes/routes.js');
const auth = require('./auth/auth.js');
const localAuth = require('./auth/strategies/localAuth.js');
const githubAuth = require('./auth/strategies/githubAuth.js');
const googleAuth = require('./auth/strategies/googleAuth.js');
const facebookAuth = require('./auth/strategies/facebookAuth.js');

//set middlewares
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb", parameterLimit: 10000 }));
app.use(helmet());

//set view engine
app.set('view engine', 'pug');
      
//authentication
auth(app);
localAuth();
githubAuth();
facebookAuth();
googleAuth();

//routing
routes(app);

//listening
const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Example app listening on port: ' + port);
}); 