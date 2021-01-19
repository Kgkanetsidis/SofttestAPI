"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const mongoose_1 = require("mongoose");
const ErrorLogSchema = new mongoose_1.Schema({
    error: {
        type: String,
        required: false,
        trim: true
    },
    createOn: {
        type: Date,
        default: new Date()
    }
});
exports.Error = mongoose_1.model('ErrorLog', ErrorLogSchema);
