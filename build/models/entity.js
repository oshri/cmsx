"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require('./db');
exports.EntityKeys = {
    deleted: { type: Boolean, require: false, default: false },
    name: { type: String, required: true, default: false },
    description: { type: String, required: false },
    testing: { type: Boolean, required: false, default: false },
    parent: { type: String, required: false },
    mobile: { type: Boolean, required: false, default: true },
    keywords: { type: String, required: false },
    position: { type: Number, required: false },
    active: { type: Boolean, required: false, default: true },
    link: { type: String, required: false }
};
exports.EntitySchema = new mongoose_1.Schema(exports.EntityKeys, { timestamps: true });
//# sourceMappingURL=entity.js.map