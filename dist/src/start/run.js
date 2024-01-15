"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const config_1 = __importDefault(require("config"));
const Relation_1 = require("../models/Relation");
const connection_1 = require("./../database/connection");
const Admin_1 = __importDefault(require("../models/Admin"));
const run = async (app) => {
    (0, Relation_1.relations)();
    await connection_1.sequelize.authenticate({
        logging: false,
    });
    await connection_1.sequelize.sync({
        alter: true,
        logging: false,
    });
    try {
        const admin = await Admin_1.default.findAll();
        if (admin.length === 0) {
            await Admin_1.default.create({
                username: "Ajoyib",
                password: "fastfood",
            });
            console.log("Admin created successfully.");
        }
    }
    catch (error) {
        console.error("Error creating admin:", error);
    }
    console.log("Connected to the database.");
    app.listen(config_1.default.get("PORT"), () => {
        console.log(`Server is listening on port ${config_1.default.get("PORT")}`);
    });
};
exports.run = run;
