import { NextFunction, Request, Response, Router } from "express";
import BaseRoute from "./route";
/**
 * / route
 *
 * @class Subjects
 */
export default class SubjectRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class SubjectsRoute
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
    create(req: Request, res: Response, next: NextFunction): void;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
