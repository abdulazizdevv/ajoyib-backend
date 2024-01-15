"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const Category_1 = __importDefault(require("./Category"));
const Product_1 = __importDefault(require("./Product"));
const relations = () => {
    Product_1.default.belongsTo(Category_1.default, { foreignKey: "categoryId" });
    Category_1.default.hasMany(Product_1.default, { foreignKey: "categoryId" });
};
exports.relations = relations;
