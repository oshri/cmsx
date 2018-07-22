import { NextFunction, Request, Response, Router } from "express";
import  BaseRoute from "./route";
import { Page, IPage } from "../models/page";

/**
 * / route
 *
 * @class Page
 */
export default class PageRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class PageRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        router.get("/pages/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
            await new PageRoute().getPagesByCategory(req, res, next);
        });

        router.post("/pages", (req: Request, res: Response, next: NextFunction) => {
            new PageRoute().create(req, res, next);
        });

        router.delete("/pages", async (req: Request, res: Response, next: NextFunction) => {
            await new PageRoute().delete(req, res, next);
        });

        router.put("/pages", async (req: Request, res: Response, next: NextFunction) => {
            await new PageRoute().update(req, res, next);
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

    public async getPagesByCategory(req: Request, res: Response, next: NextFunction) {
        if (!req.params.categoryId) {
            this.logErrorAndNext("Missing categoryId parameter", {}, {}, next, res, 400);
        } else {
            const categoryId = req.params.categoryId;
            const pages = await Page
                    .find({'categoryId': categoryId, deleted: false})
                    .then((pages) => res.status(200).json({success: true, pages}))
                    .catch(error => res.status(500).json({error}));;
        }
    }

    public create(req: Request, res: Response, next: NextFunction) {

        const checkProps = this.checkProps(req.body, "name|categoryId");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Create Page didn't get a relevant find field (name) in the body",
                {}, req.body, next, res, 400);
        } else {
            const page = new Page(req.body);
            page.save()
                .then((doc) => res.status(200).json({success: true, id: page.id}))
                .catch(reason => res.status(500).json({error: reason}))
        }

    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const checkProps = this.checkProps(req.body, "id");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Delete Page didn't get a relevant find field (id) in the body",
                {}, req.body, next, res, 400);
        } else {
            const body = req.body;
            const page = await Page
                .update({_id: body.id}, {deleted: true})
                .then(() => res.status(200).json({success: true}))
                .catch(error => res.status(500).json({error}));    
        }
    };

    public async update(req: Request, res: Response, next: NextFunction) {
        const checkProps = this.checkProps(req.body, "id");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Update Page didn't get a relevant find field (id) in the body",
                {}, req.body, next, res, 400);
        } else {
            const body = req.body;
            const page = await Page
                .update({id: body.id}, body)
                .then(async (doc) => {
                    if(!doc) {res.status(404).json({success: false})}
                    res.status(200).json({success: true});
                })
                .catch(error => res.status(500).json({error}));    
        }
    }
}
