import { Request, Response, Router } from "express";
import BaseRoute from "./route";
/**
 * / route
 *
 * @class Index
 */
export default class IndexRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    static create(router: Router): void;
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor();
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     */
    index(req: Request, res: Response): void;
}
