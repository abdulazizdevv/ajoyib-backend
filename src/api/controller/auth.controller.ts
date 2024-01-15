import { NextFunction, Request, Response } from "express";
import Admin from "../../models/Admin";
import { signToken } from "../utils/jwt";

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username, password } });

    if (!admin)
      return res.status(403).json({ message: "Invalid email or password" });

    const token = signToken({ id: admin.dataValues.id });

    res.status(200).json({ message: "Success", token: token });
  } catch (error) {
    next(error);
  }
};
