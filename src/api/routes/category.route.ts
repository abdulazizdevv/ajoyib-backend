import { Router } from "express";
import {
  deleteCategory,
  getAllCategory,
  getOneCategory,
  postCategory,
  putCategory,
} from "../controller/category.controller";
import { isAdmin } from "../../middleware/isAdmin.middleware";

export const router = Router();

router.post("/create/category", isAdmin, postCategory);
router.get("/get/category",  getAllCategory);
router.get("/get/category/:id", getOneCategory);
router.put("/put/category/:id", isAdmin, putCategory);
router.delete("/delete/category/:id", isAdmin, deleteCategory);
