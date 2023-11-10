import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { SearchUserSchema, updatePasswordSchema } from "../schemas/user";

export const list = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUsersRole = async (req, res) => {
  try {
    const users = await User.getAllUsersRole();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id, role_id } = req.body;
    await User.updateUserRole(id, role_id);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIsDelete = async (req, res) => {
  try {
    const { id, is_delete } = req.body;
    await User.updateBlockUser(id, is_delete);
    res.json({ message: "Khóa tài khoản thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const usersItem = await User.getUserById(req.params.id);
    if (!usersItem) {
      res.status(404).json({ error: "UserItem not found" });
    } else {
      res.json(usersItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      res.json(user);
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword, idUser } = req.body;
    const { error } = updatePasswordSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.getUserById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
    }
    const password = await bcrypt.hash(newPassword, 10);
    const email = user.email;
    await User.resetPassword(email, password);
    res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id, img, email, name, gender, phone } = req.body;
    await User.updateUser(id, img, email, name, gender, phone);
    res.json({ message: "Cập nhập thông tin khách hàng thành công" });
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const searchUser = async (req, res) => {
  try {
    const { error } = SearchUserSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const {name, email, phone, is_delete , gender, role_id} = req.body;
    const users =await User.search(name, email, phone, is_delete , gender, role_id);
    if(users.length === 0) {
      return res.status(400).json({
        message: "Không có tài khoản nào phù hợp",
      });
    }
    return res.status(200).json({
      users,
      message: "search thành công",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
