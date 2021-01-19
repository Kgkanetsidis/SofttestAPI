"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const categoryController_1 = require("../controllers/categoryController");
const express = require("express");
exports.categoryRoute = express.Router();
exports.categoryRoute.get('/', categoryController_1.CategoryController.getCategories);
exports.categoryRoute.post('/', categoryController_1.CategoryController.saveCategories);
