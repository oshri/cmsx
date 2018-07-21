"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("winston");
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
class BaseRoute {
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
    addScript(src) {
        this.scripts.push(src);
        return this;
    }
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
    render(req, res, view, options) {
        //add constants
        // res.locals.BASE_URL = "/";
        //add scripts
        // res.locals.scripts = this.scripts;
        //add title
        // res.locals.title = this.title;
        //render view
        res.render(view, options);
    }
    checkProps(checkInput, listInput) {
        let list = listInput.split("|");
        for (let prop of list) {
            let val = checkInput[prop];
            if (val !== null && val !== undefined) {
                return { isProp: true, prop: val };
            }
        }
        return { isProp: false };
    }
    logErrorAndNext(message, error, dynamic, next, res, code) {
        logger.error(message, error, dynamic);
        next(res.status(code).send({
            error, message
        }));
    }
}
exports.default = BaseRoute;
//# sourceMappingURL=route.js.map