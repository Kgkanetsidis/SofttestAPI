"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
class ProductController {
    static getProducts(req, res, next) {
        Product_1.Product.find({}, (err, result) => {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    msg: err,
                });
            }
            else {
                res.json({
                    status: "success",
                    msg: "Products found!",
                    data: result,
                });
            }
        });
    }
    static getProductById(req, res, next) {
        const productId = req.params.id;
        Product_1.Product.findById(productId, (err, result) => {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    msg: err,
                });
            }
            else {
                res.json({
                    status: "success",
                    msg: "Product found!",
                    data: result,
                });
            }
        });
    }
    static addProduct(req, res, next) {
        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
        const product = req.body;
        Product_1.Product.create(product)
            .then((result) => {
            res.json({
                status: "success",
                msg: "Product Added!",
                data: result,
            });
        })
            .catch((err) => {
            res.status(500).json({
                status: "failed",
                msg: err,
            });
        });
    }
    static getProductByCategory(req, res, next) {
        const category = req.body.category;
        let productCount = 0;
        Product_1.Product.find()
            .estimatedDocumentCount()
            .exec((err, result) => {
            productCount = result;
            Product_1.Product.find({ category: category }, (err, result) => {
                if (err) {
                    res.status(500).json({ status: "faled", message: err });
                }
                else {
                    res.json({
                        statis: "success",
                        msg: "Product found",
                        data: result,
                        count: productCount,
                    });
                }
            });
        });
    }
    static updateProduct(req, res, next) {
        Product_1.Product.findByIdAndUpdate(req.body._id, {
            $set: {
                description: req.body.description,
                price: req.body.price,
                outOfStock: req.body.outOfStock,
            },
        }, { new: true }, (err, result) => {
            //<any>?????
            if (err) {
                res.status(500).json({
                    status: "failed",
                    msg: err,
                });
            }
            else {
                res.json({
                    status: "success",
                    msg: "Product Updated",
                    data: result,
                });
            }
        });
    }
    static searchProduct(req, res, next) {
        const productName = req.body.productName;
        let productCount = 0;
        Product_1.Product.find()
            .estimatedDocumentCount()
            .exec((err, result) => {
            productCount = result;
            Product_1.Product.find({ productName: { $regex: productName, $options: "i" } }, (err, result) => {
                if (err) {
                    res.status(500).json({ status: "faled", message: err });
                }
                else {
                    res.json({
                        statis: "success",
                        msg: "Product List found",
                        data: result,
                        count: productCount,
                    });
                }
            });
        });
    }
}
exports.ProductController = ProductController;
