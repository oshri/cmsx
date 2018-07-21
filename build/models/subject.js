"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require('./db');
exports.SubjectKeys = {
    defaultView: { type: Boolean, required: false, default: true }
};
exports.SubjectSchema = new mongoose_1.Schema(exports.SubjectKeys, { timestamps: true });
exports.Subject = mongoose_1.model("Subject", exports.SubjectSchema);
//# sourceMappingURL=subject.js.map