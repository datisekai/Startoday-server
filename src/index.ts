import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import BaseRoute from "./routes/base";
import CategoryRoute from "./routes/category";
import UserRoute from "./routes/User";
import RoleRoute from "./routes/Role";
import NewsRoute from "./routes/News";
import StatisticRoute from "./routes/Statistic";
import mongoose from "mongoose";
import UserController from "./controller/UserController";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.xglhda1.mongodb.net/?retryWrites=true&w=majority`,
      {}
    );

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, This is server of datisekai");
});

app.post("/dang-nhap", UserController.login);

app.use("/nguoi-dung", UserRoute);
app.use("/tin-tuc", NewsRoute);
app.use("/loai-nguoi-dung", RoleRoute);
app.use("/thong-ke", StatisticRoute);

// app.use("/co-ban", BaseRoute);
app.use("/danh-muc", CategoryRoute);

const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log("Server running...." + PORT);
});
