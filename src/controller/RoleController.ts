import { Request, Response } from "express";
import Role from "../models/Role";
const RoleController = {
  addRole: async (req: Request, res: Response) => {
    const { name, _id } = req.body;
    if (!name || !_id) {
      return res
        .status(404)
        .json({ success: false, message: "Name or _id is missing" });
    }

    try {
      const newRole = new Role({
        name,
        _id: _id,
      });
      await newRole.save();
      return res.json({ success: true, data: newRole });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  deleteRole: async (req: Request, res: Response) => {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "_id is missing" });
    }

    try {
      const roleDelete = await Role.findByIdAndDelete(_id);
      return res.json({ success: true, data: roleDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  getRole: async (req: Request, res: Response) => {
    try {
      const roles = await Role.find().sort("-createdAt");
      return res.json({ success: true, data: roles });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default RoleController;
