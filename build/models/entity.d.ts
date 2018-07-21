import { Document, Schema } from "mongoose";
export interface IEntity {
    id?: any;
    deleted?: boolean;
    name: string;
    description?: string;
    longDescription?: string;
    testing?: boolean;
    parent?: string;
    mobile?: boolean;
    keywords?: string;
    position: number;
    active?: boolean;
    link?: string;
}
export interface IEntityModel extends IEntity, Document {
}
export declare const EntityKeys: {
    deleted: {
        type: BooleanConstructor;
        require: boolean;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        required: boolean;
        default: boolean;
    };
    description: {
        type: StringConstructor;
        required: boolean;
    };
    testing: {
        type: BooleanConstructor;
        required: boolean;
        default: boolean;
    };
    parent: {
        type: StringConstructor;
        required: boolean;
    };
    mobile: {
        type: BooleanConstructor;
        required: boolean;
        default: boolean;
    };
    keywords: {
        type: StringConstructor;
        required: boolean;
    };
    position: {
        type: NumberConstructor;
        required: boolean;
    };
    active: {
        type: BooleanConstructor;
        required: boolean;
        default: boolean;
    };
    link: {
        type: StringConstructor;
        required: boolean;
    };
};
export declare const EntitySchema: Schema;
