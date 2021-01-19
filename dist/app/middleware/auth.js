"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function validateUser(req, res, next) {
    const token = req.headers['x-access-token'];
    const private_key = process.env.PRIVATEKEY || '';
    jsonwebtoken_1.verify(token, private_key, (err, decoded) => {
        if (err) {
            res.status(401).json({
                status: 'failed',
                msg: 'Your session is expired',
                data: null
            });
        }
        else {
            req.body.userId = decoded.id;
            next();
        }
    });
}
exports.validateUser = validateUser;
