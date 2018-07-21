import { NextFunction, Request, Response, Router } from "express";
import  BaseRoute from "./route";
import { Subject, ISubject } from "../models/subject";

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
    public static create(router: Router) {
        router.get("/subjects", async (req: Request, res: Response, next: NextFunction) => {
            const result = (await Subject.find({})).map((subject: ISubject) => {
                return {name: subject.name};
            });
            res.json(result);
        });

        router.post("/subjects", (req: Request, res: Response, next: NextFunction) => {
            new SubjectRoute().create(req, res, next);
        });
        // router.delete("/sujects", async (req: Request, res: Response, next: NextFunction) => {
        //     await new SubjectRoute().delete(req, res, next);
        // });
        // router.put("/subjects", async (req: Request, res: Response, next: NextFunction) => {
        //     await new SubjectRoute().update(req, res, next);
        // });
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

    public create(req: Request, res: Response, next: NextFunction) {

        const checkProps = this.checkProps(req.body, "name");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Create Subject didn't get a relevant find field (name) in the body",
                {}, req.body, next, res, 400);
        } else {
            const subject = new Subject(req.body);
            subject.save().then(async () => {
                res.status(200).json({success: true, id: subject.id});
            }).catch(reason => {
                res.status(500).json({error: reason});
            })
        }

    }

    public async delete(req: Request, res: Response, next: NextFunction) {

    };

    public async update(req: Request, res: Response, next: NextFunction) {

    }
}
