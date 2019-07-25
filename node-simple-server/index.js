// Require the http and http-status-codes modules
const http = require('http');
const httpStatus = require('http-status-codes');

const port = 3000;

// Create the server with request and response parameters
app = http.createServer((req, res) => {
    console.log('Received an incoming request!');
    res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});

    // Write the response to the client
    let responseMessage = '<h1>Hello, Universe!</h1>';
    res.write(responseMessage);
    res.end();
    console.log(`Sent a response: ${responseMessage}`);
});

// Tell the application server to listen on port 3000
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
