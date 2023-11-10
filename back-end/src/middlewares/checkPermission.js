import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUserById(decoded.id);
    if (!user || user.role_id !== 1) {
      throw new Error("Bạn không có quyền truy cập tài nguyên này");
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
