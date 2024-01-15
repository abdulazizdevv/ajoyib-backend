import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "category",
  }
);

export default Category;
