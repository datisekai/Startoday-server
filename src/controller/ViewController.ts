import { Request, Response } from "express";
import News from "../models/News";
import View from "../models/View";
const ViewController = {
  increaseView: async (req: Request, res: Response) => {
    const { slug } = req.query;
    if (!slug) {
      return res.status(404).json({ success: false, message: "Missing slug" });
    }
    try {
      const currentNews = await News.findOne({ slug });
      if (!currentNews) {
        return res
          .status(404)
          .json({ success: false, message: "News not found" });
      }

      const currentViews = await View.findOne({ newsId: currentNews._id });
      if (!currentViews) {
        return res
          .status(404)
          .json({ success: false, message: "News not found" });
      }
      const newView = Number(currentViews.view) + 1;
      const views = await View.findOneAndUpdate(
        { _id: currentViews._id },
        { view: newView }
      );

      return res.json({ success: true, data: views });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default ViewController;
