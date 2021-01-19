"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
const mongoose = require("mongoose");
class MongoConnect {
    static connect() {
        const mongoDBConn = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDBConn, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}
exports.MongoConnect = MongoConnect;
