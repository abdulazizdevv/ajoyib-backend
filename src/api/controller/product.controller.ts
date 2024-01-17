import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import fs from "fs";
import Product from "../../models/Product";
import Category from "../../models/Category";
import path from "path";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price, categoryId } = req.body;
    const image = req.files?.image;

    if (!image) {
      return res.status(400).json({ message: "Image not found" });
    }

    const extname = Array.isArray(image)
      ? image[0].mimetype.split("/")[1]
      : image.mimetype.split("/")[1];

    const imageName = `${v4()}.${extname}`;

    if (Array.isArray(image)) {
      image[0].mv(`${process.cwd()}/uploads/${imageName}`);
    } else {
      image.mv(`${process.cwd()}/uploads/${imageName}`);
    }

    await Product.create({
      image: imageName,
      title,
      description,
      price,
      categoryId,
    });

    res.status(201).json({ message: "Successfully Created Product" });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findAll();
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(200).json({ message: "Not product" });
    }
  } catch (error) {
    next(error);
  }
};
export const getCategoryProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await Product.findAll({
      include: {
        model: Category,
        where: { id },
      },
    });
    console.log(product);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(200).json({ message: "Not product" });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({ where: { id } });
    if (data !== null) {
      res.status(200).json(data);
    } else {
      res.status(403).json({ message: "Not found this product" });
    }
  } catch (error) {
    next(error);
  }
};

export const putProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const image = req.files?.image;

    const extname = Array.isArray(image)
      ? image[0].mimetype.split("/")[1]
      : image?.mimetype.split("/")[1];

    const imageName = `${v4()}.${extname}`;

    const existingProduct = await Product.findOne({ where: { id } });

    const imagePath = existingProduct?.dataValues.image;

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const filePath = path.join(process.cwd(), "uploads", imagePath);
    
    if (image) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Image file deleted successfully");
      } else {
        res.status(403).json({ message: "Image file does not exist" });
      }
    }

    let updatedImageName = existingProduct.image;

    if (Array.isArray(image)) {
      image[0].mv(`${process.cwd()}/uploads/${imageName}`);
      updatedImageName = imageName;

      // Delete the old image if it exists
      if (existingProduct.image) {
        fs.unlinkSync(`${process.cwd()}/uploads/${existingProduct.image}`);
      }
    } else {
      if (image) {
        image.mv(`${process.cwd()}/uploads/${imageName}`);
        updatedImageName = imageName;

        // Delete the old image if it exists
        if (existingProduct.image) {
          fs.unlinkSync(`${process.cwd()}/uploads/${existingProduct.image}`);
        }
      }
    }

    // Uncomment the following lines when you are ready to update the product in the database
    await Product.update(
      {
        image: updatedImageName,
        title,
        description,
        price,
      },
      { where: { id } }
    );

    res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id: id } });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const imagePath = product.dataValues.image;

    await Product.destroy({ where: { id } });

    // Delete the corresponding image file from the file system
    try {
      const filePath = path.join(process.cwd(), "uploads", imagePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Image file deleted successfully");
      } else {
        res.status(403).json({ message: "Image file does not exist" });
      }
    } catch (error) {
      console.error("Error deleting image file:", error);
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
