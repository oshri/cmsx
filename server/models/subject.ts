import {Document, Schema, Model, model} from "mongoose";
import { IEntity } from './entity';
import { db } from "./db";
require('./db');

export interface ISubject extends IEntity {
    defaultView?: boolean;
}

export interface ISubjectModel extends ISubject, Document {

}

export const SubjectKeys = {
    defaultView: {type: Boolean, required: false, default: true}
};

export const SubjectSchema: Schema = new Schema(SubjectKeys, {timestamps: true});
export const Subject: Model<ISubjectModel> = model<ISubjectModel>("Subject", SubjectSchema);
