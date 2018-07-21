"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
/**
 * / route
 *
 * @class Index
 */
class IndexRoute extends route_1.default {
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    static create(router) {
        //add home page route
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res);
        });
    }
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     */
    index(req, res) {
        res.json({ "sucess": "sababa" });
    }
}
exports.default = IndexRoute;
//# sourceMappingURL=index.js.map