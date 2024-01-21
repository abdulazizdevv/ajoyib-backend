import config from "config";
import { relations } from "../models/Relation";
import { sequelize } from "./../database/connection";
import { Application } from "express";
import Admin from "../models/Admin";

export const run = async (app: Application) => {
  relations();
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    alter: true,
    logging: false,
  });

  try {
    const admin = await Admin.findAll();
    if (admin.length === 0) {
      await Admin.create({
        username: "Ajoyib",
        password: "fastfood",
      });
      console.log("Admin created successfully.");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }

  console.log("Connected to the database.");
  app.listen(config.get("PORT"), () => {
    console.log(`Server is listening on port ${config.get("PORT")}`);
  });
};
