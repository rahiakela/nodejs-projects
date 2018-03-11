import * as express from 'express';
declare var next: (error: any) => void;

let router = express.Router();

/* GET home page. */
let index = (request: express.Request, response: express.Response) => {
    response.render('index', {title: 'Express'});
};

router.get('/', index);

export default router;
