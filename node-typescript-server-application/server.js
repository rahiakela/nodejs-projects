"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var rootRouter = require("./routes/root.router");
var portNumber = 9000;
var app = express();
app.set('port', portNumber);
// Configure view templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// create http listener
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
// using json parser, url encoding and method overridden middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
// routes
app.use('/', rootRouter);
// use static file middleware for static files, such as .css files
app.use(express.static('public/css'));
