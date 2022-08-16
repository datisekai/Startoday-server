import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
const isAdmin = async (req: Request, res: Response, next: any) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Missing token",
    });
  try {
    const detoken: any = jwt.verify(token, process.env.JWT_SECRET);
    if (detoken && detoken.role === 1 && detoken.status === true) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Token incorrect" });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error Token",
    });
  }
};
export default isAdmin;
