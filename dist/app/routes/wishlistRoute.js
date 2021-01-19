"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRoute = void 0;
const wishlistController_1 = require("../controllers/wishlistController");
const express = require("express");
const auth_1 = require("../middleware/auth");
exports.wishlistRoute = express.Router();
exports.wishlistRoute.get('/', auth_1.validateUser, wishlistController_1.WishListController.getWishList);
exports.wishlistRoute.post('/', auth_1.validateUser, wishlistController_1.WishListController.saveWishList);
