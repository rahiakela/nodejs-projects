import * as express from 'express';
import { default as indexRoute } from './index.route';
import { default as bookRoutes} from './book.route';
declare var next: (error: any) => void;

let router = express.Router();

// sub-routers
router.use('/', indexRoute);
router.use('/book', bookRoutes);

// Export the router
export = router;
