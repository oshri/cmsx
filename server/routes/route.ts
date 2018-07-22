import {NextFunction, Request, Response} from "express";
import * as logger from "winston";

const console = new logger.transports.Console();

logger
  .clear()          
  .add(console)     
  .remove(console);


/**
 * Constructor
 *
 * @class BaseRoute
 */
export default class BaseRoute {

    protected title: string;

    private scripts: string[];

    protected logger: any;

    
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        //initialize variables
        this.title = "Bounce Data Access";
        this.scripts = [];
        this.logger = logger;
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

    public render(req: Request, res: Response, view: string, options?: Object) {
        res.render(view, options);
    }

    protected checkProps(checkInput: any, listInput: string) {
        let list: string[] = listInput.split("|");
        for (let prop of list) {
            let val = checkInput[prop];
            if (val !== null && val !== undefined) {
                return {isProp: true, prop: val};
            }
        }
        return {isProp: false};
    }

    protected logErrorAndNext(message: string, error: any, dynamic: any, next: NextFunction, res: Response, code: number) {
        logger.error(message, error, dynamic);
        next(res.status(code).send({
            error, message
        }));
    }
}
