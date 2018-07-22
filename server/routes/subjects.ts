import { NextFunction, Request, Response, Router } from 'express';
import BaseRoute from './route';
import { Subject, ISubject } from '../models/subject';

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
		router.get(
			'/subjects',
			async (req: Request, res: Response, next: NextFunction) => {
				const result = (await Subject.find({}))
					.filter((subject: ISubject) => !subject.deleted)
					.map((subject: ISubject) => {
						return {
							id: subject.id,
							name: subject.name,
							active: subject.active
						};
					});

				res.json(result);
			}
		);

		router.post(
			'/subjects',
			(req: Request, res: Response, next: NextFunction) => {
				new SubjectRoute().create(req, res, next);
			}
		);

		router.delete(
			'/subjects',
			async (req: Request, res: Response, next: NextFunction) => {
				await new SubjectRoute().delete(req, res, next);
			}
		);

		router.put(
			'/subjects',
			async (req: Request, res: Response, next: NextFunction) => {
				await new SubjectRoute().update(req, res, next);
			}
		);
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
		const checkProps = this.checkProps(req.body, 'name');
		if (!checkProps.isProp) {
			return this.logErrorAndNext(
				"Create Subject didn't get a relevant find field (name) in the body",
				{},
				req.body,
				next,
				res,
				400
			);
		} else {
			const subject = new Subject(req.body);
			subject
				.save()
				.then(async doc =>
					res.status(200).json({ success: true, id: subject.id })
				)
				.catch(reason => res.status(500).json({ error: reason }));
		}
	}

	public async delete(req: Request, res: Response, next: NextFunction) {
		const checkProps = this.checkProps(req.body, 'id');
		if (!checkProps.isProp) {
			return this.logErrorAndNext(
				"Delete Subject didn't get a relevant find field (id) in the body",
				{},
				req.body,
				next,
				res,
				400
			);
		} else {
			const body = req.body;
			const subDel = await Subject.update(
				{ id: body.id },
				{ deleted: true, active: false }
			)
				.then(async () => res.status(200).json({ success: true }))
				.catch(error => res.status(500).json({ error }));
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		const checkProps = this.checkProps(req.body, 'id');
		if (!checkProps.isProp) {
			return this.logErrorAndNext(
				"Update Subject didn't get a relevant find field (id) in the body",
				{},
				req.body,
				next,
				res,
				400
			);
		} else {
			const body = req.body;
			const subDel = await Subject.update({ id: body.id }, body)
				.then(async doc => {
					if (!doc) {
						res.status(404).json({ success: false });
					}
					res.status(200).json({ success: true });
				})
				.catch(error => res.status(500).json({ error }));
		}
	}
}
