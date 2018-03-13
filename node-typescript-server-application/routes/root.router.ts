import * as express from 'express';
import indexRouter from './index.route';
import bookRouter from './book.route';
declare var next: (error: any) => void;

let rootRouter = express.Router();

// sub-routers
rootRouter.use('/', indexRouter);
rootRouter.use('/book', bookRouter);

// Export the router
export default rootRouter;
