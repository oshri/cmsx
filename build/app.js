"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
dotenv.config({ path: ".env" });
// Routes
const index_1 = require("./routes/index");
const subjects_1 = require("./routes/subjects");
/**
 * The server.
 *
 * @class Server
 */
class App {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
        return new App();
    }
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.express = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
        process.on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            // application specific logging, throwing an error, or other logic here
        });
    }
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    api() {
        //empty for now
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config() {
        //add static paths
        this.express.use(express.static(path.join(__dirname, "public")));
        //mount logger
        this.express.use(logger("dev"));
        //mount json form parser
        this.express.use(bodyParser.json());
        //mount query string parser
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        //mount cookie parser middleware
        this.express.use(cookieParser("SECRET_GOES_HERE"));
        // catch 404 and forward to error handler
        this.express.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.express.use(errorHandler());
        // Add WhiteList For Cors to support localhost:4200 & heroku
        const whiteLIst = ['http://localhost:4200'];
        const corsOptions = {
            origin: function (origin, callback) {
                if (whiteLIst.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    console.error("Invalid origin", origin);
                    callback(new Error('Not allowed by CORS'));
                }
            },
            optionsSuccessStatus: 200
        };
        // this.express.use(cors(corsOptions));
    }
    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    routes() {
        let router;
        router = express.Router();
        index_1.default.create(router);
        subjects_1.default.create(router);
        this.express.use(router);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map