import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import BaseRoute from "./routes/base";
import CategoryRoute from "./routes/category";
import mongoose from "mongoose";

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

app.use("/co-ban", BaseRoute);
app.use("/danh-muc", CategoryRoute);

const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log("Server running...." + PORT);
});
