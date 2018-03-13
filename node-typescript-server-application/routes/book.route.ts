import * as express from 'express';
import * as bookController from '../controllers/book.controller';
declare var next: (error: any) => void;

let bookRouter = express.Router();

/* GET /book */
bookRouter.get('/', bookController.list);
/* POST /book */
bookRouter.post('/', bookController.submit);

export default bookRouter;
