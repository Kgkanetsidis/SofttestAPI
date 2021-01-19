"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListController = void 0;
const Wishlist_1 = require("../models/Wishlist");
const mongoose_1 = require("mongoose");
class WishListController {
    static getWishList(req, res, next) {
        Wishlist_1.WishList.aggregate([
            {
                $match: { userId: new mongoose_1.Types.ObjectId(req.body.userId), status: 'A' }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'UserWishList'
                }
            }
        ], (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'User WishList!', data: result });
            }
        });
    }
    static saveWishList(req, res, next) {
        const wishlist = new Wishlist_1.WishList(req.body);
        Wishlist_1.WishList.create(wishlist, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product added to wishlist!', data: {} });
            }
        });
    }
}
exports.WishListController = WishListController;
