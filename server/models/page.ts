import {Document, Schema, Model, model} from "mongoose";
import { IEntity, EntityKeys } from './entity';


export interface IPage extends IEntity {
    categoryId: string;
    showInHomePage: boolean;
    homepagePosition: number;
    history: boolean;
}

export interface IPageModel extends IPage, Document {

}

export const PageKeys = {
    categoryId: {type: String, required: true},
    showInHomePage: {type: Boolean, required:true, default: false},
    homepagePosition: {type: Number, required: false},
    history: {type: Boolean, required: false, default: false},
    ...EntityKeys
};

export const PageSchema: Schema = new Schema(PageKeys, {timestamps: true});
export const Page: Model<IPageModel> = model<IPageModel>("Page", PageSchema);
