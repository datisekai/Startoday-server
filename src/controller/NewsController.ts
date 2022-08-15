import slugify from "slugify";
import { Request, Response } from "express";
import News from "../models/News";
const NewsController = {
  addNews: async (req: Request, res: Response) => {
    const {
      author,
      avatar = null,
      title,
      description,
      html,
      category,
      status = true,
    } = req.body;
    if (!author || !title || !description || !html || !category) {
      return res.status(404).json({ success: false, message: "Missing field" });
    }

    try {
      const newNews = new News({
        author,
        avatar,
        title,
        description,
        html,
        category,
        status,
        slug: slugify(title),
      });

      await newNews.save();
      return res.json({ success: true, data: newNews });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  updateNews: async (req: Request, res: Response) => {
    const {
      author,
      avatar = null,
      title,
      description,
      html,
      category,
      status,
      _id,
    } = req.body;
    if (!author || !title || !description || !html || !category || !_id) {
      return res.status(404).json({ success: false, message: "Missing field" });
    }

    try {
      const newsUpdate = await News.findByIdAndUpdate(_id, {
        author,
        avatar,
        title,
        description,
        html,
        status,
        category,
      });
      return res.json({ success: true, data: newsUpdate });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  deleteNews: async (req: Request, res: Response) => {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "_id is missing" });
    }

    try {
      const newsDelete = await News.findByIdAndDelete(_id);
      return res.json({ success: true, data: newsDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getNews: async (req: Request, res: Response) => {
    try {
      const news = await News.find({ status: true })
        .sort("-createdAt")
        .populate("author")
        .populate("category");
      return res.json({ success: true, data: news });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getNewsAdmin: async (req: Request, res: Response) => {
    try {
      const news = await News.find()
        .sort("-createdAt")
        .populate("author")
        .populate("category");
      return res.json({ success: true, data: news });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getNewsByCategory: async (req: Request, res: Response) => {
    const { category } = req.params;
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Missing category" });
    }

    try {
      const news = await News.find({ category, status: true })
        .populate("author")
        .populate("category");
      return res.json({ success: true, data: news });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default NewsController;
