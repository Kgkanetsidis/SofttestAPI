import { Request, Response, NextFunction, Errback } from "express";
import { Product } from "../models/Product";

export class ProductController {
  static getProducts(req: Request, res: Response, next: NextFunction) {
    Product.find({}, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          msg: err,
        });
      } else {
        res.json({
          status: "success",
          msg: "Products found!",
          data: result,
        });
      }
    });
  }

  static getProductById(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id;
    Product.findById(productId, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          msg: err,
        });
      } else {
        res.json({
          status: "success",
          msg: "Product found!",
          data: result,
        });
      }
    });
  }

  static addProduct(req: Request, res: Response, next: NextFunction) {
    req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
    const product = req.body;
    Product.create(product)
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

  static getProductByCategory(req: Request, res: Response, next: NextFunction) {
    const category = req.body.category;
    let productCount = 0;
    Product.find()
      .estimatedDocumentCount()
      .exec((err: Errback, result: any) => {
        productCount = result;
        Product.find({ category: category }, (err: Errback, result: any) => {
          if (err) {
            res.status(500).json({ status: "faled", message: err });
          } else {
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

  static updateProduct(req: Request, res: Response, next: NextFunction) {
    Product.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          description: req.body.description,
          price: req.body.price,
          outOfStock: req.body.outOfStock,
        },
      },
      { new: true },
      (err: Errback, result: any) => {
        //<any>?????
        if (err) {
          res.status(500).json({
            status: "failed",
            msg: err,
          });
        } else {
          res.json({
            status: "success",
            msg: "Product Updated",
            data: result,
          });
        }
      }
    );
  }

  static searchProduct(req: Request, res: Response, next: NextFunction) {
    const productName = req.body.productName;
    let productCount = 0;
    Product.find()
      .estimatedDocumentCount()
      .exec((err: Errback, result: any) => {
        productCount = result;
        Product.find(
          { productName: { $regex: productName, $options: "i" } },
          (err: Errback, result: any) => {
            if (err) {
              res.status(500).json({ status: "faled", message: err });
            } else {
              res.json({
                statis: "success",
                msg: "Product List found",
                data: result,
                count: productCount,
              });
            }
          }
        );
      });
  }
}
