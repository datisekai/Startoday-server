import { Request, Response } from "express";
import Users from "../models/Users";

import jwt from "jsonwebtoken";

const UserController = {
  addUser: async (req: Request, res: Response) => {
    const { email, password, status = 1, role = 0 } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password missing" });
    }

    try {
      const newUser = new Users({
        email,
        password,
        status,
        role,
      });

      await newUser.save();
      return res.json({ success: true, data: newUser });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    const { email, password, status, role } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password missing" });
    }

    try {
      const currentUser = await Users.findOne({ email });
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userUpdate = await Users.findOneAndUpdate(
        { _id: currentUser._id },
        { password, status, role }
      );

      return res.json({ success: true, data: userUpdate });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { _id } = req.body;

    if (!_id) {
      return res.status(404).json({ success: false, message: "Missing _id" });
    }

    try {
      const userDelete = await Users.findByIdAndDelete(_id);
      return res.json({ success: true, data: userDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password is missing!" });
    }

    try {
      const currentUser = await Users.findOne({ email });
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (password !== currentUser.password) {
        return res
          .status(404)
          .json({ success: false, message: "Email or password incorrect" });
      }

      if (currentUser.status !== true) {
        return res
          .status(404)
          .json({ success: false, message: "Your account was blocked!" });
      }

      const token = jwt.sign(
        {
          email: currentUser.email,
          role: currentUser.role,
          status: currentUser.status,
          _id: currentUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      return res.json({
        success: true,
        data: {
          token,
          user: {
            _id: currentUser._id,
            email: currentUser.email,
            role: currentUser.role,
            status: currentUser.status,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const users = await Users.find().sort("-createdAt");
      return res.json({ success: true, data: users });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getUserbyId: async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!_id) {
      return res.status(404).json({ success: false, message: "Missing _id" });
    }
    try {
      const user = await Users.findById(_id);
      return res.json({ success: true, data: user });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default UserController;
