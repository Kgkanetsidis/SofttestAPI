"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const Category_1 = require("../models/Category");
class CategoryController {
    static getCategories(req, res, next) {
        Category_1.Category.find({}, (err, result) => {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    msg: err,
                });
            }
            else {
                res.json({
                    status: 'success',
                    msg: 'Categories found!',
                    data: result
                });
            }
        });
    }
    static saveCategories(req, res, next) {
        const categories = req.body;
        Category_1.Category.insertMany(categories).then((result) => {
            res.json({
                status: 'success',
                msg: 'Categories Added!',
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                status: "failed",
                msg: err,
            });
        });
    }
}
exports.CategoryController = CategoryController;
