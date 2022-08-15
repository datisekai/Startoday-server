import slugify from "slugify";
import { Request, Response } from "express";
import Category from "../models/Category";
const CategoryController = {
  addCategory: async (req: Request, res: Response) => {
    try {
      const { name, parentId } = req.body;
      const newCategory = new Category({
        name,
        parentId: parentId || null,
        slug: slugify(name),
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
  deleteCategory: async (req: Request, res: Response) => {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "_id is missing" });
    }
    try {
      const categoryDelete = await Category.findByIdAndDelete(_id);
      return res.json({ success: true, data: categoryDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default CategoryController;
