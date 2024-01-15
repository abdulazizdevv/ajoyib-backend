import { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";

export const postCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    await Category.create({
      name,
    });

    res.status(201).json({ message: "Successfully Created Category" });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findAll();
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(200).json({ message: "No category found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getOneCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({ where: { id } });
    if (data !== null) {
      res.status(200).json(data);
    } else {
      res.status(403).json({ message: "Category not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const putCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.update(
      {
        name,
      },
      { where: { id } }
    );

    res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Category.destroy({ where: { id } });

    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};