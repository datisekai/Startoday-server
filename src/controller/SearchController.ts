import { Request, Response } from "express";
import News from "../models/News";

const SearchController = {
  searchNews: async (req: Request, res: Response) => {
    const { text, category, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    if (!text && !category) {
      return res
        .status(404)
        .json({ success: false, message: "Missing text or category" });
    }
    try {
      if (text && !category) {
        const textReg = new RegExp(text.toString(), "i");
        const result = await News.find({ title: textReg, status: true })
          .skip(skip)
          .limit(Number(limit));
        return res.json({ success: true, data: result });
      }

      if (!text && category) {
        const result = await News.find({ category, status: true })
          .skip(skip)
          .limit(Number(limit));
        return res.json({ success: true, data: result });
      }

      if (text && category) {
        const textReg = new RegExp(text.toString(), "i");
        const result = await News.find({
          title: textReg,
          status: true,
          category,
        })
          .skip(skip)
          .limit(Number(limit));
        return res.json({ success: true, data: result });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default SearchController;
