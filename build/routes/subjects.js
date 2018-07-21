"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const route_1 = require("./route");
const subject_1 = require("../models/subject");
/**
 * / route
 *
 * @class Subjects
 */
class SubjectRoute extends route_1.default {
    /**
     * Create the routes.
     *
     * @class SubjectsRoute
     * @method create
     * @static
     */
    static create(router) {
        router.get("/subjects", (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = (yield subject_1.Subject.find({})).map((subject) => {
                return { name: subject.name };
            });
            res.json(result);
        }));
        router.post("/subjects", (req, res, next) => {
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
    create(req, res, next) {
        const checkProps = this.checkProps(req.body, "name");
        if (!checkProps.isProp) {
            return this.logErrorAndNext("Create Subject didn't get a relevant find field (name) in the body", {}, req.body, next, res, 400);
        }
        else {
            const subject = new subject_1.Subject(req.body);
            subject.save().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                res.status(200).json({ success: true, id: subject.id });
            })).catch(reason => {
                res.status(500).json({ error: reason });
            });
        }
    }
    delete(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    update(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = SubjectRoute;
//# sourceMappingURL=subjects.js.map