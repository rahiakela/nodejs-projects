import * as express from 'express';
declare var next: (error: any) => void;

let indexRouter = express.Router();

/* GET home page. */
let index = (request: express.Request, response: express.Response) => {
    response.render('index', {title: 'Express'});
};

indexRouter.get('/', index);

export default indexRouter;
