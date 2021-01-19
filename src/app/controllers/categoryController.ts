import { Request, Response, NextFunction, Errback } from "express";
import { Category} from '../models/Category';

export class CategoryController {
    
    static getCategories( req: Request, res: Response, next: NextFunction){
        Category.find({},(err: Errback, result: any) => {
            if (err) {
              res.status(500).json({
                status: "failed",
                msg: err,
              });
            } else {
                res.json({
                    status: 'success',
                    msg: 'Categories found!',
                    data: result
                })
            }
        })
    }

    static saveCategories(req: Request, res: Response, next: NextFunction){
        const categories = req.body;
        Category.insertMany(categories).then((result)=>{
            res.json({
                status: 'success',
                msg: 'Categories Added!',
                data: result
            })
        }).catch((err)=>{
            res.status(500).json({
                status: "failed",
                msg: err,
              })
        }) 
    }


    

    // , (err: Errback, result: any) => {
    //     if (err) {
    //         res.status(500).json({
    //           status: "failed",
    //           msg: err,
    //         })
    //       } else {
    //           res.json({
    //               status: 'success',
    //               msg: 'Categories Added!',
    //               data: result
    //           })
    //       }
    // });




}