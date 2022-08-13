import { Request, Response } from "express";
import Category from "../models/Category";
const CategoryController = {
  addCategory: async (req: Request, res: Response) => {
    try {
      const { name, parentId } = req.body;
      const newCategory = new Category({
        name,
        parentId: parentId || null,
      });

      await newCategory.save();

      return res.json({ message: true, data: newCategory });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getCategory: async (req: Request, res: Response) => {
    try {
      const data = await Category.find();
      return res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default CategoryController;
