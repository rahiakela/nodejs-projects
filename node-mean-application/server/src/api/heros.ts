/**
 * @class HerosApi
 */
import {Request, Response, NextFunction, Router} from "express";

export class HerosApi  {

    /**
     * Route the api.
     * @static
     */
    public static route(router: Router) {
        // DELETE
        router.delete('/heros/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {

        });

        // GET
        router.get('/heros', (req: Request, res: Response, next: NextFunction) => {

        });
    }
}