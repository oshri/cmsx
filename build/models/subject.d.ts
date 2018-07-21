import { Document, Schema, Model } from "mongoose";
import { IEntity } from './entity';
export interface ISubject extends IEntity {
    defaultView?: boolean;
}
export interface ISubjectModel extends ISubject, Document {
}
export declare const SubjectKeys: {
    defaultView: {
        type: BooleanConstructor;
        required: boolean;
        default: boolean;
    };
};
export declare const SubjectSchema: Schema;
export declare const Subject: Model<ISubjectModel>;
