"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const WishListSchema = new mongoose_1.Schema({
    productId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        default: 'A'
    },
    createOn: {
        type: Date,
        default: new Date()
    },
    modifiedOn: {
        type: Date
    }
});
exports.WishList = mongoose_1.model('WishList', WishListSchema);
