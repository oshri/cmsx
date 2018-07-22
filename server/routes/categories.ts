import { NextFunction, Request, Response, Router } from "express";
import  BaseRoute from "./route";
import { Category, ICategory } from "../models/category";

/**
 * / route
 *
 * @class Categories
 */
export default class CategoriesRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class CategoriesRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        router.get("/categories/:subjectId", async (req: Request, res: Response, next: NextFunction) => {
            await new CategoriesRoute().getCategoriesBySubject(req, res, next);
        });

        router.post("/categories", (req: Request, res: Response, next: NextFunction) => {
            new CategoriesRoute().create(req, res, next);
        });

        router.delete("/categories", async (req: Request, res: Response, next: NextFunction) => {
            await new CategoriesRoute().delete(req, res, next);
        });

        router.put("/categories", async (req: Request, res: Response, next: NextFunction) => {
            await new CategoriesRoute().update(req, res, next);
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

    public async getCategoriesBySubject(req: Request, res: Response, next: NextFunction) {
        if (!req.params.subjectId) {
            this.logErrorAndNext("Missing subjectId parameter", {}, {}, next, res, 400);
        } else {
            const subjectId = req.params.subjectId;
            const categories = await Category
                    .find({'subjectId': subjectId, deleted: false})
                    .then((categories) => res.status(200).json({success: true, categories}))
                    .catch(error => res.status(500).json({error}));;
        }
    }

    public create(req: Request, res: Response, next: NextFunction) {

        const checkProps = this.checkProps(req.body, "name|subjectId");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Create Category didn't get a relevant find field (name) in the body",
                {}, req.body, next, res, 400);
        } else {
            const category = new Category(req.body);
            category.save()
                .then((doc) => res.status(200).json({success: true, id: category.id}))
                .catch(reason => res.status(500).json({error: reason}))
        }

    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const checkProps = this.checkProps(req.body, "id");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Delete Category didn't get a relevant find field (id) in the body",
                {}, req.body, next, res, 400);
        } else {
            const body = req.body;
            const category = await Category
                .update({id: body.id}, {deleted: true})
                .then(() => res.status(200).json({success: true}))
                .catch(error => res.status(500).json({error}));    
        }
    };

    public async update(req: Request, res: Response, next: NextFunction) {
        const checkProps = this.checkProps(req.body, "id");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Update Category didn't get a relevant find field (id) in the body",
                {}, req.body, next, res, 400);
        } else {
            const body = req.body;
            const category = await Category
                .update({id: body.id}, body)
                .then(async (doc) => {
                    if(!doc) {res.status(404).json({success: false})}
                    res.status(200).json({success: true});
                })
                .catch(error => res.status(500).json({error}));    
        }
    }
}
