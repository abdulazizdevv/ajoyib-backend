"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth.route");
const category_route_1 = require("./category.route");
const product_route_1 = require("./product.route");
exports.default = [auth_route_1.router, category_route_1.router, product_route_1.router];
