import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as routes from './routes/index';

const portNumber = 9000;
const app = express();

app.set('port', portNumber);

// Configure view templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create http listener
http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

// using json parser, url encoding and method overridden middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

// routes
app.get('/', routes.index);

// use static file middleware for static files, such as .css files
app.use(express.static('public/css'));

