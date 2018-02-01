"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var portNumber = 8080;
function requestListener(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' }); // set content type
    response.write('Method:' + request.method + '\n'); // get request method info
    response.write('URL:' + request.url + '\n');
    response.write('Welcome to Typescript HTTP server'); // send response
    response.end(); // close the response stream
}
http.createServer(requestListener).listen(portNumber);
console.log('Listening on localhost:' + portNumber);
