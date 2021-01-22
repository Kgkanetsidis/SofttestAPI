import { Request, Response, NextFunction, Errback } from "express";
import { User } from "../models/User";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class UserController {
    
  static login(req: Request, res: Response, next: NextFunction) {
    const private_key: string = process.env.PRIVATEKEY || "";
    User.findOne({ email: req.body.email }, (err: Errback, result: any) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          msg: err,
        });
      } else {
        if (result != undefined) {
          if (compareSync(req.body.password, result.password)) {
            const token = sign(
              {
                id: result._id,
              },
              private_key,
              { expiresIn: "1h" }
            );
            res.json({
              status: "success",
              msg: "Login Successfull",
              data: token, role: result.role
            });
          } else {
            res.json({
              status: "Failed",
              msg: "Username or Password is Incorrect",
            });
          }
        } else {
          res.json({
            status: "Failed",
            msg: "Email does not exist",
          });
        }
      }
    });
  }

  static registration(req: Request, res: Response, next: NextFunction) {
    const user = new User(req.body);
    User.create<any>(user, (err: Errback, result: any) => {
      //<any>?????
      if (err) {
        res.status(500).json({
          status: "failed",
          msg: err,
        });
      } else {
        res.json({
          status: "success",
          msg: "Registration Successfull",
          data: result,
        });
      }
    });
  }

  static updateProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          addressInfo: req.body.addressInfo,
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
            msg: "Profile Updated",
            data: null,
          });
        }
      }
    );
  }

  static getProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId;
    User.findById(userId, (err: Errback, result: any) => {
      //<any>?????
      if (err) {
        res.status(500).json({
          status: "failed",
          msg: err,
        });
      } else {
        res.json({
          status: "success",
          msg: "Profile Updated",
          data: result,
        });
      }
    });
  }
}
