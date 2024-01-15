"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const isAdmin_middleware_1 = require("../../middleware/isAdmin.middleware");
exports.router = (0, express_1.Router)();
exports.router.post("/post/product", isAdmin_middleware_1.isAdmin, product_controller_1.createProduct);
exports.router.get("/get/product", product_controller_1.getAllProducts);
exports.router.get("/get/product/category/:id", product_controller_1.getCategoryProducts);
exports.router.get("/get/all/product", product_controller_1.getAllProducts);
exports.router.get("/get/product/:id", product_controller_1.getOneProduct);
exports.router.put("/put/product/:id", isAdmin_middleware_1.isAdmin, product_controller_1.putProduct);
exports.router.delete("/delete/product/:id", isAdmin_middleware_1.isAdmin, product_controller_1.deleteProduct);