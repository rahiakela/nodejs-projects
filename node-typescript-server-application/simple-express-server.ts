import * as express from 'express';
import {error} from "util";

const portNumber = 8080;
const app = express();

// routing
app.get('/', (request, response) => {
    response.send('Hello,' + request.query.firstname + ' ' + request.query.lastname);
});

// listing HTTP request
app.listen(portNumber, 'localhost', () => {
    console.log('Listening on localhost:' + portNumber);
});

// error handling
app.use((error, request, response, next) => {
    console.error(error.message);
    response.status(500).send('An error has occurred.');
});
