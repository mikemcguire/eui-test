// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express();

// SERVER CONFIGURATION
// ====================
server.configure(function() {

  server.use(express["static"](__dirname + "/../public"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));


  server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  }); 

  server.use(express.bodyParser())

  server.use(server.router);

});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Welcome to Backbone-Require-Boilerplate!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js');