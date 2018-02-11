"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var portNumber = 8080;
var app = express();
// routing
app.get('/', function (request, response) {
    response.send('Hello,' + request.query.firstname + ' ' + request.query.lastname);
});
// listing HTTP request
app.listen(portNumber, 'localhost', function () {
    console.log('Listening on localhost:' + portNumber);
});
// error handling
app.use(function (error, request, response, next) {
    console.error(error.message);
    response.status(500).send('An error has occurred.');
});
