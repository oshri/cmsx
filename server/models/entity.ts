import {Document, Schema} from "mongoose";
import { db } from "./db";
require('./db');

export interface IEntity {
    id?: any;
    deleted?: boolean;
    name: string
    description?: string;
    longDescription?: string;
    testing?: boolean,
    mobile?: boolean;
    keywords?: string;
    position: number;
    active?: boolean;
    link?: string;
}

export interface IEntityModel extends IEntity, Document {

}

export const EntityKeys = {
    deleted: {type: Boolean, require: false, default: false},
    name: {type: String, required: true},
    description: {type: String, required: false},
    longDescription: {type: String, required: false},
    testing: {type: Boolean, required: false, default: false},
    mobile: {type: Boolean, required: false, default: true},
    keywords: {type: String, required: false},
    position: {type: Number, required: false},
    active: {type: Boolean, required: false, default: true},
    link: {type: String, required: false}
};

export const EntitySchema: Schema = new Schema(EntityKeys, {timestamps: true});
