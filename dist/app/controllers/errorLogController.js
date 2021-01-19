"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogController = void 0;
const Error_1 = require("../models/Error");
class ErrorLogController {
    static getErrorLog(req, res, next) {
        Error_1.Error.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Error Log!', data: result });
            }
        });
    }
    static saveError(req, res, next) {
        const error = new Error_1.Error(req.body);
        Error_1.Error.create(error, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Error saved!', data: {} });
            }
        });
    }
}
exports.ErrorLogController = ErrorLogController;
