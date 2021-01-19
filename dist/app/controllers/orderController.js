"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = require("../models/Order");
class OrderController {
    static placeOrder(req, res, next) {
        const order = new Order_1.Order(req.body);
        Order_1.Order.create(order, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Order Placed!', data: result._id });
            }
        });
    }
    static getOrderDetails(req, res, next) {
        Order_1.Order.findById(req.params.orderId, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Order Found!', data: result });
            }
        });
    }
    static getUserOrders(req, res, next) {
        Order_1.Order.find({ userId: req.body.userId }, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Orders Found!', data: result });
            }
        });
    }
    static getAllOrders(req, res, next) {
        Order_1.Order.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Orders Found!', data: result });
            }
        });
    }
    static updateOrderStatus(req, res, next) {
        Order_1.Order.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                status: req.body.status,
                courierInfo: req.body.courierInfo
            }
        }, { new: true }, (err, result) => {
            if (result === null) {
                res.json({ status: 'error', message: 'Order Not available', data: null });
            }
            else {
                res.json({ status: 'success', message: 'Order updated', data: null });
            }
        });
    }
    static getDashBoardInfo(req, res, next) {
        Order_1.Order.find({}).sort('-createdOn').limit(10).exec((err, orders) => {
            if (err) {
                res.json({ status: 'failed', message: err, data: {} });
            }
            else {
                Order_1.Order.aggregate([
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ], (err, result) => {
                    if (err) {
                        res.json({ status: 'failed', message: err, data: {} });
                    }
                    else {
                        res.json({ status: 'success', message: 'Product added to cart!', data: { result, orders } });
                    }
                });
            }
        });
    }
}
exports.OrderController = OrderController;
