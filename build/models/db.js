"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGODB_URI);
exports.db = db;
console.log(db);
//# sourceMappingURL=db.js.map