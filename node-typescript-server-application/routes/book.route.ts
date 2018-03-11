import * as express from 'express';
import * as bookController from '../controllers/book.controller';
declare var next: (error: any) => void;

let router = express.Router();

/* GET /book */
router.get('/', bookController.list);
/* POST /book */
router.post('/', bookController.submit);

export default router;
