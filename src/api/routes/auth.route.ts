import { Router } from "express";
import { authAdmin } from "../controller/auth.controller";

export const router = Router();

router.post("/admin", authAdmin);

