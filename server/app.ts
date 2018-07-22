import { Response, Request, NextFunction } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorhandler";
import * as cors from "cors";

dotenv.config({ path: ".env" });

// Routes
import IndexRoute from "./routes/index";
import SubjectRoute from './routes/subjects';
import CategoryRoute from './routes/categories';
import PageRoute from './routes/pages';

/**
 * The server.
 *
 * @class Server
 */
export default class App {
    public express: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): App {
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
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
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
        this.express.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.express.use(errorHandler());


        // TODO : Remove cors after add client & srs
        // Add WhiteList For Cors to support localhost:4200 & heroku
        // const whiteLIst = ['http://localhost:4200'];

        // const corsOptions = {
        //     origin: function (origin: string, callback: Function) {
        //         if (whiteLIst.indexOf(origin) !== -1) {
        //             callback(null, true);
        //         } else {
        //             console.error("Invalid origin", origin);
        //             callback(new Error('Not allowed by CORS'));
        //         }
        //     },
        //     optionsSuccessStatus: 200
        // };

        // this.express.use(cors(corsOptions));

    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    private routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        SubjectRoute.create(router);
        CategoryRoute.create(router);
        PageRoute.create(router);

        this.express.use(router);
    }
}
