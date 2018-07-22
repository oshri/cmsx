import {Document, Schema, Model, model} from "mongoose";
import { IEntity, EntityKeys } from './entity';


export interface ICategory extends IEntity {
    subjectId: string;
}

export interface ICategoryModel extends ICategory, Document {

}

export const CategoryKeys = {
    subjectId: {type: String, required: true},
    ...EntityKeys
};

export const CategorySchema: Schema = new Schema(CategoryKeys, {timestamps: true});
export const Category: Model<ICategoryModel> = model<ICategoryModel>("Category", CategorySchema);
