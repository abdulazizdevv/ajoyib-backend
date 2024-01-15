import Category from "./Category";
import Product from "./Product";
export const relations = () => {
  Product.belongsTo(Category, { foreignKey: "categoryId" });
  Category.hasMany(Product, { foreignKey: "categoryId" });
};
