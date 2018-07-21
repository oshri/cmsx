import { NextFunction, Request, Response } from "express";
/**
 * Constructor
 *
 * @class BaseRoute
 */
export default class BaseRoute {
    protected title: string;
    private scripts;
    protected logger: any;
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor();
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    addScript(src: string): BaseRoute;
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    render(req: Request, res: Response, view: string, options?: Object): void;
    protected checkProps(checkInput: any, listInput: string): {
        isProp: boolean;
        prop: any;
    } | {
        isProp: boolean;
        prop?: undefined;
    };
    protected logErrorAndNext(message: string, error: any, dynamic: any, next: NextFunction, res: Response, code: number): void;
}
