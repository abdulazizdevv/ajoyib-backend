import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

class Product extends Model {
  public id!: number;
  public image!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public categoryId!: number;
  public createdAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "product",
  }
);

export default Product;
