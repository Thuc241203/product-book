import Carts from "../models/carts";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { cartsSchema } from "./../schemas/carts";
export const getIDlistCarts = async (req, res) => {
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
      try {
        const carts = await Carts.getAllCarts(user?.id);
        res.json(carts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const deleteAllCarts = async (req, res) => {
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
      try {
        const carts = await Carts.deleteAllCarts(user?.id);
        res.json(carts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
export const deleteIDCarts = async (req, res) => {
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
      try {
        const cartId = req.params.cartId;
        const carts = await Carts.deleteCartsById(user?.id, cartId);
        res.json(carts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const createCarts = async (req, res) => {
  try {
    const { user_id, products_id, quantity } = req.body;
    const { error } = cartsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const cartsId = await Carts.createCarts(user_id, products_id, quantity);
    res.json({ id: cartsId, message: "Thêm thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuantityCarts = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { error } = cartsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Carts.updateCarts(req.params.id, quantity);
    res.json({ message: "Cập Nhập Số Lượng Thành Công " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const increaseQuantityCarts = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { error } = cartsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Carts.addQuantityToCarts(req.params.id, quantity);
    res.json({ message: "Thêm Số Lượng Thành Công " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const decreaseQuantityCarts = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { error } = cartsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Carts.decreaseQuantityToCarts(req.params.id, quantity);
    res.json({ message: "Trừ Số Lượng Thành Công " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
