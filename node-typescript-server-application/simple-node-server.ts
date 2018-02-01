import * as http from 'http';

const portNumber = 8080;

function requestListener(request: http.ServerRequest, response: http.ServerResponse) {
    response.writeHead(200, {'Content-Type': 'text/plain'}); // set content type
    response.write('Method:' + request.method + '\n'); // get request method info
    response.write('URL:' + request.url + '\n');
    response.write('Welcome to Typescript HTTP server'); // send response
    response.end(); // close the response stream
}

http.createServer(requestListener).listen(portNumber);

console.log('Listening on localhost:' + portNumber);