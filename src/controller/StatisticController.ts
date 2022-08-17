import { Request, Response } from "express";
import Category from "../models/Category";
import News from "../models/News";
import Users from "../models/Users";
const statisticController = {
  dashboard: async (req: Request, res: Response) => {
    try {
      const result = await Promise.all([
        Users.find(),
        Category.find(),
        News.find(),
      ]);

      let view = 0;
      result[2].forEach((item) => {
        view += +item.view;
      });

      return res.json({
        success: true,
        data: {
          users: result[0].length,
          category: result[1].length,
          news: result[2].length,
          view,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default statisticController;
