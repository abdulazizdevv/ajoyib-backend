import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategoryProducts,
  getOneProduct,
  putProduct,
} from "../controller/product.controller";
import { isAdmin } from "../../middleware/isAdmin.middleware";

export const router = Router();

router.post("/post/product", isAdmin, createProduct);
router.get("/get/product", getAllProducts);
router.get("/get/product/category/:id", getCategoryProducts);
router.get("/get/all/product", getAllProducts);
router.get("/get/product/:id", getOneProduct);
router.put("/put/product/:id", isAdmin, putProduct);
router.delete("/delete/product/:id", isAdmin, deleteProduct);
