"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
const isAdmin_middleware_1 = require("../../middleware/isAdmin.middleware");
exports.router = (0, express_1.Router)();
exports.router.post("/create/category", isAdmin_middleware_1.isAdmin, category_controller_1.postCategory);
exports.router.get("/get/category", category_controller_1.getAllCategory);
exports.router.get("/get/category/:id", category_controller_1.getOneCategory);
exports.router.put("/put/category/:id", isAdmin_middleware_1.isAdmin, category_controller_1.putCategory);
exports.router.delete("/delete/category/:id", isAdmin_middleware_1.isAdmin, category_controller_1.deleteCategory);
