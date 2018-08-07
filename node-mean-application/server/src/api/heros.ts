import { NextFunction, Request, Response, Router } from 'express';
import { Hero, HeroModel } from '../model/hero';

/**
 * @class HerosApi
 */
export class HerosApi {
  /**
   * Route the api.
   * @static
   */
  public static route(router: Router) {
    const heroApi = new HerosApi();
    // DELETE
    router.delete(
      '/heros/:id([0-9a-f]{24})',
      (req: Request, res: Response, next: NextFunction) => {
        heroApi.delete(req, res, next);
      }
    );

    // GET a lis of hero
    router.get('/heros', (req: Request, res: Response, next: NextFunction) => {
      heroApi.list(req, res, next);
    });

    // GET a hero
    router.get(
      '/heros/:id([0-9a-f]{24})',
      (req: Request, res: Response, next: NextFunction) => {
        heroApi.get(req, res, next);
      }
    );

    // POST
    router.post('/heros', (req: Request, res: Response, next: NextFunction) => {
      heroApi.create(req, res, next);
    });

    // PUT
    router.put(
      '/heros/:id([0-9a-f]{24})',
      (req: Request, res: Response, next: NextFunction) => {
        heroApi.update(req, res, next);
      }
    );
  }

  /**
   * Create a new hero.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    // create hero
    const hero = new Hero(req.body);
    hero
      .save()
      .then(hero => {
        res.json(hero.toObject);
        next();
      })
      .catch(next);
  }

  /**
   * Delete a hero.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public delete(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = 'id';
    if (req.params[PARAM_ID] === undefined) {
      this.notFound(res, next);
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get Hero
    Hero.findById(id)
      .then(hero => {
        // verify hero exists
        if (hero === null) {
          this.notFound(res, next);
        }

        hero
          .remove()
          .then(() => {
            res.sendStatus(200);
            next();
          })
          .catch((err: any) => next(err));
      })
      .catch(next);
  }

  /**
   * Get a hero.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public get(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = 'id';
    if (req.params[PARAM_ID] === undefined) {
      this.notFound(res, next);
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get hero
    Hero.findById(id)
      .then(hero => {
        // verify hero was found
        if (hero === null) {
          this.notFound(res, next);
        }
        // send json of hero object
        res.json(hero.toObject);
        next();
      })
      .catch(next);
  }

  /**
   * List all heros.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    Hero.find()
      .then(heros => {
        res.json(heros.map(hero => hero.toObject()));
        next();
      })
      .catch((err: any) => next(err));
  }

  /**
   * Update a hero.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public update(req: Request, res: Response, next: NextFunction) {
    const PARAM_ID: string = 'id';
    // verify the id parameter exists
    if (req.params[PARAM_ID] === undefined) {
      this.notFound(res, next);
    }

    // get id from request
    const id: string = req.params[PARAM_ID];

    //  get hero
    Hero.findById(id)
      .then(hero => {
        // verify hero was found
        if (hero === null) {
          this.notFound(res, next);
        }

        // update hero
        Object.assign(hero, req.body)
          .save()
          .then((hero: HeroModel) => {
            res.json(hero.toObject());
            next();
          })
          .catch(next);
      })
      .catch(next);
  }

  private notFound(res: Response, next: NextFunction) {
    res.sendStatus(404);
    next();
    return;
  }
}
